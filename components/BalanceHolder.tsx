"use client"

import { toPrecision } from "@/lib/numbers"
import { useWalletUSDCBalance } from "@/lib/wallet"
import { useFundWallet } from "@privy-io/react-auth"
import { IoMdAdd } from "react-icons/io"
import { base } from "viem/chains"
import { useAccount } from "wagmi"

export default function BalanceHolder() {
  const { fundWallet } = useFundWallet()
  const { address } = useAccount()

  const { data: balance } = useWalletUSDCBalance(address)

  const handleFundWallet = () => {
    fundWallet(address!, {
      chain: base,
      asset: "USDC",
      config: {
        currencyCode: "USDC_BASE",
      },
      card: {
        preferredProvider: "moonpay",
      },
    })
  }

  return (
    <div className="grid place-items-center place-content-center">
      <button
        onClick={handleFundWallet}
        className="active:scale-[0.98] outline-none"
      >
        <div className="font-bold text-4xl sm:text-5xl">
          <span className="font-mono">$</span>
          {toPrecision(balance, 2)}
        </div>
        <div className="inline-flex mt-0.5 items-center gap-1">
          <span className="text-lg font-medium opacity-70">Add funds</span>
          <IoMdAdd className="opacity-70 text-xl" />
        </div>
      </button>
    </div>
  )
}
