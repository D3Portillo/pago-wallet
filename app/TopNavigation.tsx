"use client"

import DialogDefault from "@/components/DialogDefault"
import DropdownSettings from "@/components/DropdownSettings"
import { usePrivy } from "@privy-io/react-auth"
import { HiOutlineCog } from "react-icons/hi"
import { useAccount } from "wagmi"

export default function TopNavigation() {
  const { logout } = usePrivy()
  const { address } = useAccount()

  console.debug({ address })

  return (
    <nav className="px-3 shrink-0 h-16 mb-12 max-w-6xl mx-auto w-full flex items-center gap-4 justify-between">
      <DropdownSettings
        trigger={
          <button className="size-10 outline-none">
            <HiOutlineCog className="text-3xl" />
          </button>
        }
      />
      <DialogDefault
        trigger={
          <button className="bg-black outline-none rounded-full size-9" />
        }
      >
        <h1 className="text-2xl font-bold">Hello</h1>
        <p className="opacity-70">You are logged in as {address}</p>
        <button onClick={logout}>Logout</button>
      </DialogDefault>
    </nav>
  )
}
