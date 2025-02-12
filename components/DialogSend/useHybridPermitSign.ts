"use client"

import { Address, parseAbi } from "viem"
import { base } from "viem/chains"
import { useAccount, usePublicClient, useSignTypedData } from "wagmi"

import { USDC_BASE } from "@/lib/wallet"
import {
  useSignTypedData as usePrivySignTypedData,
  useWallets,
} from "@privy-io/react-auth"

/**
 * Helper function to sign permit for USDC
 * from the connected wallet - can be either
 * embedded or smart wallet, or EOA.
 */
export default function useHybridPermitSign() {
  const { address: connectedWallet } = useAccount()
  const client = usePublicClient()
  const { wallets } = useWallets()
  const { signTypedDataAsync } = useSignTypedData()
  const { signTypedData: privySignTypedData } = usePrivySignTypedData()

  async function signPermitUSDC({
    owner,
    spender,
    value,
  }: {
    owner: Address
    spender: Address
    value: bigint
  }) {
    try {
      const isEmbeddedWallet = Boolean(
        wallets.find(
          (wallet) =>
            wallet.connectorType === "embedded" &&
            wallet.address === connectedWallet
        )
      )

      const ONE_HOUR_IN_BLOCK_TIME = Math.floor(Date.now() / 1000) + 3600
      const NONCE = await client?.readContract({
        abi: parseAbi([
          "function nonces(address) public view returns (uint256)",
        ]),
        address: USDC_BASE,
        functionName: "nonces",
        args: [owner],
      })

      if (NONCE === undefined) return null
      // Early return if nonce errored

      const PAYLOAD = {
        message: {
          owner,
          spender,
          value: isEmbeddedWallet ? `0x${value.toString(16)}` : value,
          nonce: isEmbeddedWallet ? Number(NONCE) : NONCE,
          deadline: isEmbeddedWallet
            ? // Hex since bigint is not json serializable
              // for embedded wallets methods (privy)
              `0x${ONE_HOUR_IN_BLOCK_TIME.toString(16)}`
            : BigInt(ONE_HOUR_IN_BLOCK_TIME),
        },
        primaryType: "Permit",
        types: {
          Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        domain: {
          name: "USD Coin",
          version: "2", // EIP712 version
          chainId: base.id,
          verifyingContract: USDC_BASE,
        },
      }

      const result: any = await (isEmbeddedWallet
        ? privySignTypedData
        : signTypedDataAsync)(PAYLOAD as any)

      return {
        signature: result?.signature || result,
        expireTime: ONE_HOUR_IN_BLOCK_TIME,
      }
    } catch (_) {}

    return null
  }

  return { signPermitUSDC }
}
