import "./globals.css"

import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import { Toaster } from "sonner"

import Provider from "./web3/Provider"
import AuthSentinel from "./AuthSentinel"
import TopNavigation from "./TopNavigation"
import BottomNavigation from "./BottomNavigation"

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
        <Toaster position="top-center" />
        <Provider>
          <AuthSentinel />
          <div className="min-h-screen flex flex-col">
            <TopNavigation />
            {children}
            <BottomNavigation />
          </div>
        </Provider>
      </body>
    </html>
  )
}
