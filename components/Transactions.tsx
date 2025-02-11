"use client"

import { useWalletTransactions } from "@/lib/wallet"
import { useAccount } from "wagmi"

export default function Transactions() {
  const { address } = useAccount()
  const { data: txs } = useWalletTransactions(address)

  console.debug({ txs })
  return null
}
