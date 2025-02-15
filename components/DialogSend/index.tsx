"use client"

import { type SendTransactionModalUIOptions } from "@privy-io/react-auth"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { encodeFunctionData, erc20Abi, isAddress, parseAbi } from "viem"
import { useAccount } from "wagmi"
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets"

import DialogDefault from "@/components/DialogDefault"
import { Button } from "@/components/ui/button"
import Input from "@/components/Input"

import { FaArrowRightLong } from "react-icons/fa6"

import { USDC_BASE, useAlchemy, useWalletUSDCBalance } from "@/lib/wallet"
import { useFormattedInputHandler } from "@/lib/input"
import useHybridPermitSign from "./useHybridPermitSign"

import { beautifyAddress } from "@/lib/utils"
import { toPrecision } from "@/lib/numbers"
import { toSplittedSignature } from "@/lib/signature"
import { MdContacts } from "react-icons/md"

import DialogContactSelector from "./DialogContactSelector"

const ABI_PERMIT = parseAbi([
  "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public",
])
export default function DialogSend({ trigger }: { trigger: React.ReactNode }) {
  const { alchemy } = useAlchemy(1) // Ethereum Mainnet
  const { address: connectedWallet } = useAccount()
  const { data: balance } = useWalletUSDCBalance(connectedWallet)
  const balanceInput = useFormattedInputHandler({ decimals: 6 })

  const { client: smartWalletClient } = useSmartWallets()
  const { signPermitUSDC } = useHybridPermitSign()

  const [recipient, setRecipient] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isBalanceStep, setIsBalanceStep] = useState(false)

  useEffect(() => {
    return () => {
      // Reset values when dialog is closed
      balanceInput.resetValue()
      setIsBalanceStep(false)
      setRecipient("")
    }
  }, [isOpen])

  async function handleSend() {
    const isENSAddress = recipient.endsWith(".eth")
    const SMART_WALLET_ADDRESS = smartWalletClient?.account.address!
    const OWNER = connectedWallet!
    const RECIPIENT = isENSAddress
      ? // We fetch the address for the given ENS
        (await alchemy.core.resolveName(recipient)) || ""
      : recipient

    if (!isAddress(RECIPIENT)) return toast.error("Invalid address")
    if (!isBalanceStep) return setIsBalanceStep(true) // Continue to balance step

    if (Number(balanceInput.value) <= 0) {
      return toast.error("Invalid balance")
    }

    if (balanceInput.value > balance.formatted) {
      return toast.error("Insufficient balance")
    }

    const permit = await signPermitUSDC({
      owner: OWNER,
      spender: SMART_WALLET_ADDRESS,
      value: balanceInput.formattedValue,
    })

    if (!permit) return toast.error("Oops! Something went wrong")
    // Early return if no signature

    const uiOptions: SendTransactionModalUIOptions = {
      buttonText: "Confirm",
      showWalletUIs: true,
      description: `You are about to send ${
        balanceInput.value
      } USDC to ${beautifyAddress(recipient, 7)}`,
      transactionInfo: {
        action: "Send",
        title: "Sending USDC",
      },
    }
    const { r, s, v } = toSplittedSignature(permit.signature)

    const txHash = await smartWalletClient?.sendTransaction(
      {
        account: smartWalletClient?.account,
        calls: [
          {
            to: USDC_BASE,
            data: encodeFunctionData({
              abi: ABI_PERMIT,
              args: [
                OWNER,
                SMART_WALLET_ADDRESS,
                balanceInput.formattedValue,
                BigInt(permit.expireTime),
                v,
                r,
                s,
              ],
            }),
          },
          {
            to: USDC_BASE,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "transferFrom",
              args: [OWNER, RECIPIENT, balanceInput.formattedValue],
            }),
          },
        ],
      },
      {
        uiOptions,
      }
    )

    window.open(`https://basescan.org/tx/${txHash}`, "_blank")
  }

  function handleMax() {
    balanceInput.setValue(balance.formatted)
  }

  return (
    <DialogDefault open={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
      {isBalanceStep ? (
        <nav className="flex whitespace-nowrap text-2xl items-center gap-4 justify-between">
          <h1 className="font-bold">Send USDC</h1>
          <span>
            <FaArrowRightLong />
          </span>
          <span className="text-[80%] font-bold py-0.5 bg-black/3 rounded-lg px-2 border">
            {isAddress(recipient)
              ? beautifyAddress(recipient, 4, "")
              : recipient}
          </span>
        </nav>
      ) : (
        <h1 className="text-2xl font-bold">Send USDC</h1>
      )}

      {isBalanceStep ? (
        <label className="mt-5 block w-full">
          <nav className="flex items-center justify-between gap-4">
            <p>Balance</p>
          </nav>

          <Input
            value={balanceInput.value}
            onChange={balanceInput.onChangeHandler}
            placeholder="0.00"
            className="mt-1"
            endEnhancer={
              <button
                onClick={handleMax}
                className="text-lg font-medium h-full"
              >
                MAX
              </button>
            }
          />

          <nav className="flex items-center justify-center mt-2 gap-4">
            <p>
              Available:{" "}
              <span className="font-medium">
                {toPrecision(balance.formatted, 4)} USDC
              </span>
            </p>
          </nav>
        </label>
      ) : (
        <label className="mt-5 block group w-full">
          <p>Recipient address</p>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.currentTarget.value.trim())}
            placeholder="d3portillo.eth"
            className="mt-1 pr-0"
            endEnhancer={
              <DialogContactSelector
                showActiveAddress={recipient as any}
                onSelect={(contact) => setRecipient(contact.address)}
                trigger={
                  <button className="size-12 opacity-40 group-focus-within:opacity-70 grid place-items-center">
                    <MdContacts className="text-xl" />
                  </button>
                }
              />
            }
          />
        </label>
      )}
      <Button
        onClick={handleSend}
        disabled={!recipient}
        className="text-xl mt-5 w-full"
      >
        {isBalanceStep ? "Send USDC" : "Continue"}
      </Button>
    </DialogDefault>
  )
}
