"use client"

import { Button } from "@/components/ui/button"
import { useFundWallet } from "@privy-io/react-auth"
import { FaArrowDown } from "react-icons/fa"
import { base } from "viem/chains"
import { useAccount } from "wagmi"

export default function ActionReceive() {
  const { fundWallet } = useFundWallet()
  const { address } = useAccount()

  const handleReceive = () => {
    fundWallet(address!, {
      chain: base,
      asset: "USDC",
      defaultFundingMethod: "manual",
      config: {
        currencyCode: "USDC_BASE",
      },
      card: {
        preferredProvider: "moonpay",
      },
    })
  }

  return (
    <Button onClick={handleReceive} variant="ghost">
      <span>Receive</span>
      <FaArrowDown className="rotate-45 scale-125" />
    </Button>
  )
}
