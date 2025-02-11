"use client"

import { Address, erc20Abi, formatUnits } from "viem"
import { useReadContract } from "wagmi"

export const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
export const useWalletUSDCBalance = (address?: Address) => {
  const { data, ...query } = useReadContract({
    address: USDC_BASE,
    abi: erc20Abi,
    functionName: "balanceOf",
    query: {
      enabled: !!address,
    },
    args: [address!],
    scopeKey: `usdc-balance-${address || "0x0"}`,
  })

  return {
    ...query,
    data: data ? Number(formatUnits(data, 6)) : 0,
  }
}
