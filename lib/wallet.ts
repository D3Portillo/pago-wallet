"use client"

import {
  Alchemy,
  AssetTransfersCategory,
  Network,
  SortingOrder,
} from "alchemy-sdk"
import { Address, erc20Abi, formatUnits } from "viem"
import { useReadContract } from "wagmi"
import useSWR from "swr"

const alchemy = new Alchemy({
  apiKey: "TydhRO71t-iaLkFdNDoQ_eIcd9TgKv0Q",
  network: Network.BASE_MAINNET,
})

export const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const
export const useWalletUSDCBalance = (address?: Address) => {
  const { data, ...query } = useReadContract({
    address: USDC_BASE,
    abi: erc20Abi,
    functionName: "balanceOf",
    query: {
      enabled: !!address,
      refetchInterval: 5_000,
    },
    args: [address!],
    scopeKey: `usdc-balance-${address || "0x0"}`,
  })

  return {
    ...query,
    data: {
      formatted: data ? Number(formatUnits(data, 6)) : 0,
      raw: data || BigInt(0),
    },
  }
}

export const useWalletTransactions = (address?: Address) => {
  return useSWR(address ? `sent-${address}` : null, async () => {
    if (!address) return []
    const res = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      excludeZeroValue: true,
      withMetadata: true,
      order: SortingOrder.DESCENDING,
      category: [AssetTransfersCategory.ERC20],
    })

    return res.transfers
      .filter((tx) => tx.asset === "USDC")
      .map(({ from, to, hash, metadata, value }) => {
        return {
          from,
          value: value || 0,
          date: new Date(metadata.blockTimestamp),
          to,
          hash,
        }
      })
  })
}
