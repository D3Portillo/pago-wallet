"use client"

import type {
  SendTransactionModalUIOptions,
  UnsignedTransactionRequest,
} from "@privy-io/react-auth"

import { usePrivy } from "@privy-io/react-auth"
import DialogDefault from "./DialogDefault"
import { base } from "viem/chains"
import { useSendTransaction, useWriteContract } from "wagmi"
import { USDC_BASE } from "@/lib/wallet"
import { erc20Abi, parseUnits } from "viem"

export default function DialogSend({ trigger }: { trigger: React.ReactNode }) {
  const { user } = usePrivy()

  const isEmbedded = user?.wallet?.connectorType === "embedded"
  console.debug({ dat: user?.customMetadata, user })

  const { writeContractAsync } = useWriteContract()
  const { sendTransaction } = usePrivy()

  const unsignedTx: UnsignedTransactionRequest = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: base.id,
    value: "0x3B9ACA00",
  }

  const uiOptions: SendTransactionModalUIOptions = {
    buttonText: "Confirm",
    showWalletUIs: true,
    description: "You are about to send 32.32 USDC to 0xd8dA6...A96045",
    transactionInfo: {
      action: "Send",
      title: "Sending USDC",
    },
  }

  async function handleSend() {
    if (isEmbedded) {
      const { hash } = await sendTransaction(unsignedTx, {
        uiOptions,
      })

      return
    }

    // Request change chain

    const ticket = await writeContractAsync({
      chain: base,
      address: USDC_BASE,
      abi: erc20Abi,
      functionName: "transfer",
      args: [
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        parseUnits("32.32", 6),
      ],
    })
  }

  return (
    <DialogDefault trigger={trigger}>
      <h1 className="text-2xl font-bold">Send</h1>
      <button onClick={handleSend}>Test send</button>
    </DialogDefault>
  )
}
