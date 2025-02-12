"use client"

import type { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, createConfig } from "@privy-io/wagmi"
import { base } from "wagmi/chains"
import { http } from "wagmi"
import { type PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth"
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets"

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

const privyConfig: PrivyClientConfig = {
  appearance: {
    accentColor: "#11c367",
    theme: "#FFFFFF",
    landingHeader: "Let's get started",
    showWalletLoginFirst: false,
    logo: "/pbanner.png",
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
  defaultChain: base,
  loginMethods: ["wallet", "twitter", "email"],
  embeddedWallets: {
    requireUserPasswordOnCreate: false,
    showWalletUIs: true,
    ethereum: {
      createOnLogin: "all-users",
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
    <QueryClientProvider client={queryClient}>
      <PrivyProvider config={privyConfig} appId="cm6z8xwev00oziwicjge98w9s">
        <SmartWalletsProvider>
          <WagmiProvider config={config}>{children}</WagmiProvider>
        </SmartWalletsProvider>
      </PrivyProvider>
    </QueryClientProvider>
  )
}
