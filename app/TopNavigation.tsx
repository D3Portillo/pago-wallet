"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { usePrivy } from "@privy-io/react-auth"
import QRCode from "react-qr-code"
import copy from "copy-to-clipboard"

import { beautifyAddress } from "@/lib/utils"

import { AddressBox } from "@/components/AddressBox"
import { HiOutlineCog } from "react-icons/hi"

import DialogDefault from "@/components/DialogDefault"
import DropdownSettings from "@/components/DropdownSettings"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function TopNavigation() {
  const [open, setIsOpen] = useState(false)
  const { logout } = usePrivy()
  const { address } = useAccount()

  function copyAddress() {
    copy(address!)
    toast.success("Address copied to clipboard")
  }

  function handleLogout() {
    logout()
    setIsOpen(false)
  }

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
        open={open}
        onOpenChange={setIsOpen}
        trigger={
          <button className="bg-black flex items-center gap-2 pl-3 rounded-full">
            <strong className="text-white text-sm font-bold">
              {beautifyAddress(address, 4, "")}
            </strong>
            <div className="outline-none border-2 border-black rounded-full size-8 overflow-hidden">
              <AddressBox address={address!} />
            </div>
          </button>
        }
      >
        <div className="border max-w-[20rem] mx-auto mt-4 p-4 rounded-xl">
          <div className="w-full">
            <QRCode
              size={256}
              className="size-full"
              value={address!}
              viewBox={`0 0 256 256`}
            />
          </div>

          <p className="text-base text-center font-medium opacity-70 mt-2">
            Connected Wallet {beautifyAddress(address, 12, "...")}
          </p>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-6 text-xl"
          onClick={copyAddress}
        >
          Copy Address
        </Button>

        <Button className="w-full mt-4 text-xl" onClick={handleLogout}>
          Disconnect
        </Button>
      </DialogDefault>
    </nav>
  )
}
