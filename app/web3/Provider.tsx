"use client"

import type { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, createConfig } from "@privy-io/wagmi"
import { base } from "wagmi/chains"
import { http } from "wagmi"
import { type PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth"

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

const privyConfig: PrivyClientConfig = {
  appearance: {
    accentColor: "#000000",
    theme: "#FFFFFF",
    showWalletLoginFirst: false,
    logo: "https://auth.privy.io/logos/privy-logo.png",
    walletChainType: "ethereum-only",
    walletList: [
      "detected_wallets",
      "metamask",
      "phantom",
      "okx_wallet",
      "rabby_wallet",
      "wallet_connect",
    ],
  },
  loginMethods: ["wallet", "twitter", "email"],
  fundingMethodConfig: {
    moonpay: {
      useSandbox: true,
    },
  },
  embeddedWallets: {
    requireUserPasswordOnCreate: false,
    showWalletUIs: true,
    ethereum: {
      createOnLogin: "users-without-wallets",
    },
    solana: {
      createOnLogin: "off",
    },
  },
  mfa: {
    noPromptOnMfaRequired: false,
  },
}

export default function Provider({ children }: PropsWithChildren) {
  return (
    <PrivyProvider config={privyConfig} appId="cm6z8xwev00oziwicjge98w9s">
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
