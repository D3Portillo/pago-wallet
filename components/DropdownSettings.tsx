"use client"

import Link from "next/link"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { usePrivy } from "@privy-io/react-auth"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { IoHelpBuoySharp } from "react-icons/io5"
import { MdOutlineHistoryEdu } from "react-icons/md"
import { FaUpload } from "react-icons/fa"

function DropdownSettings({ trigger }: { trigger: React.ReactNode }) {
  const { exportWallet } = usePrivy()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-56 [&_*]:text-base"
      >
        <DropdownMenuLabel className="text-black dark:text-white px-3">
          Advanced Options
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="px-3 py-2" asChild>
            <Link href="/history">
              <div className="size-4 grid place-items-center mr-3">
                <MdOutlineHistoryEdu className="scale-[1.35]" />
              </div>
              <span>Transaction History</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full px-3 py-2" asChild>
            <button onClick={() => exportWallet()}>
              <div className="size-4 grid place-items-center mr-3">
                <FaUpload />
              </div>
              <span>Export Wallet</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-3 py-2" asChild>
          <Link target="_blank" href="https://t.me/d3portillo">
            <div className="size-4 grid place-items-center mr-3">
              <IoHelpBuoySharp className="scale-125" />
            </div>
            <span>Support & Feedback</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownSettings
