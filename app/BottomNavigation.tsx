"use client"

import { Fragment, type PropsWithChildren } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import * as Tabs from "@radix-ui/react-tabs"

import { MdHome } from "react-icons/md"
import { IoMdContacts } from "react-icons/io"
import { FaArrowUp } from "react-icons/fa"

import DialogSend from "@/components/DialogSend"
import MainContainer from "./MainContainer"

export default function BottomNavigation() {
  const pathname = usePathname()
  const activePath = pathname.startsWith("/contacts") ? "contacts" : "home"

  return (
    <Tabs.Root
      className="sticky z-1 mt-8 bottom-0 shrink-0 w-full"
      value={activePath}
    >
      <Tabs.List asChild>
        <MainContainer className="border-t bg-white flex-grow-0 h-20 flex justify-around">
          <NavItem
            href="/"
            icon={
              <span className="size-10 opacity-50 group-data-[state=active]:opacity-100 grid place-items-center">
                <MdHome className="text-3xl scale-105" />
              </span>
            }
            value="home"
          >
            Home
          </NavItem>

          <DialogSend
            trigger={
              <button className="grid place-content-center place-items-center">
                <span className="size-10 rounded-full bg-pago-yellow grid place-items-center">
                  <FaArrowUp className="text-xl scale-105" />
                </span>
                <span className="font-medium opacity-50">Send</span>
              </button>
            }
          />

          <NavItem
            href="/contacts"
            icon={
              <span className="size-10 opacity-50 group-data-[state=active]:opacity-100 grid place-items-center">
                <IoMdContacts className="text-3xl scale-110" />
              </span>
            }
            value="contacts"
          >
            Contacts
          </NavItem>
        </MainContainer>
      </Tabs.List>
    </Tabs.Root>
  )
}

function NavItem({
  children,
  value,
  href,
  icon,
}: PropsWithChildren<{
  value: string
  href: string
  icon: React.ReactNode
}>) {
  return (
    <Tabs.Trigger asChild value={value}>
      <Link
        href={href}
        className="grid group place-content-center place-items-center"
      >
        {icon}
        <span className="font-medium opacity-50 group-data-[state=active]:opacity-100">
          {children}
        </span>
      </Link>
    </Tabs.Trigger>
  )
}
