"use client"

import { Fragment, useEffect, useState } from "react"
import { usePrivy } from "@privy-io/react-auth"

import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import { ImSpinner4 } from "react-icons/im"

import asset_logo from "@/assets/logo.svg"
import Image from "next/image"

export default function AuthSentinel() {
  const [showWelcome, setShowWelcome] = useState(false)
  const { login, ready, authenticated, isModalOpen } = usePrivy()
  const isLoading = !ready

  useEffect(() => {
    setShowWelcome(!isModalOpen && !authenticated)
  }, [isModalOpen, authenticated])

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
              className="text-xl mt-12 px-7 flex items-center gap-4 h-14 rounded-xl font-bold"
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
