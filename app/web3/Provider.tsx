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
  ssr: true,
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
  loginMethods: ["google", "twitter", "email", "wallet"],
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
      <PrivyProvider
        config={privyConfig}
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      >
        <SmartWalletsProvider>
          <WagmiProvider config={config}>{children}</WagmiProvider>
        </SmartWalletsProvider>
      </PrivyProvider>
    </QueryClientProvider>
  )
}
