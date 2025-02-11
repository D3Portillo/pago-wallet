import "./globals.css"

import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"

import MainNavigation from "./MainNavigation"
import Provider from "./web3/Provider"
import AuthSentinel from "./AuthSentinel"
import TopNavigation from "./TopNavigation"

const mainFont = Instrument_Sans({
  display: "block",
  subsets: [],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Pago Wallet",
  description:
    "Pago: a-yet simple wallet for sending and receiving USDC payments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} antialiased`}>
        <Provider>
          <AuthSentinel />
          <div className="min-h-screen flex flex-col">
            <TopNavigation />
            {children}
            <MainNavigation />
          </div>
        </Provider>
      </body>
    </html>
  )
}
