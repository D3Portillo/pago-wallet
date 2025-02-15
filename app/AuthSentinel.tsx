"use client"

import { Fragment, useEffect, useState } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useSetActiveWallet } from "@privy-io/wagmi"

import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import { ImSpinner4 } from "react-icons/im"

import asset_logo from "@/assets/logo.svg"
import Image from "next/image"

export default function AuthSentinel() {
  const { login, ready, authenticated, isModalOpen, user } = usePrivy()
  const { setActiveWallet } = useSetActiveWallet()
  const { wallets: userOwnedWallets } = useWallets()

  const USER_LOGIN_ADDY = user?.wallet?.address
  const [showWelcome, setShowWelcome] = useState(false)
  const isLoading = !ready

  useEffect(() => {
    setShowWelcome(!isModalOpen && !authenticated)
  }, [isModalOpen, authenticated])

  useEffect(() => {
    const userWallet = userOwnedWallets.find(
      (wallet) => wallet.address === USER_LOGIN_ADDY
    )

    if (
      userWallet &&
      // We only set the active wallet if not injected
      // So user don't get prompted to connect their wallet again
      userWallet.connectorType !== "injected" &&
      ready &&
      authenticated
    ) {
      console.debug({ userWallet })

      // Set the active wallet for wagmi's wrapper
      // Based on user's auth from Privy to avoid mixing up with
      // Privy's bridged connector for wagmi
      setTimeout(() => {
        setActiveWallet(userWallet)
      }, 50)
    }
  }, [USER_LOGIN_ADDY, userOwnedWallets.length, authenticated, ready])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/85 backdrop-blur-sm flex items-center z-2 justify-center">
        <ImSpinner4 className="animate-[spin_2s_linear_infinite] text-4xl opacity-70" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center z-2 justify-center">
        {showWelcome ? (
          <Fragment>
            <figure className="max-w-[10rem]">
              <Image src={asset_logo} alt="" />
            </figure>

            <h1 className="text-2xl mt-4 font-medium">Welcome back 👋</h1>

            <Button
              onClick={() => login()}
              className="text-xl mt-12 px-7 flex items-center gap-4"
            >
              <span>View my account</span>
              <FaArrowRight className="scale-125" />
            </Button>
          </Fragment>
        ) : null}
      </div>
    )
  }

  // User is authenticated so we remove the account sentinel
  return null
}
