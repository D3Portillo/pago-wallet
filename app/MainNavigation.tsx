import { Fragment, type PropsWithChildren } from "react"

import { MdHome } from "react-icons/md"
import { IoMdContacts } from "react-icons/io"
import { FaArrowUp } from "react-icons/fa"

import * as Tabs from "@radix-ui/react-tabs"
import MainContainer from "./MainContainer"

export default function MainNavigation() {
  return (
    <Tabs.Root asChild>
      <Fragment>
        <Tabs.List>
          <MainContainer className="border-t h-20 flex-grow-0 flex justify-around">
            <NavItem
              icon={
                <span className="size-10 opacity-50 group-data-[state=active]:opacity-100 grid place-items-center">
                  <MdHome className="text-3xl scale-105" />
                </span>
              }
              value="home"
            >
              Home
            </NavItem>

            <NavItem
              icon={
                <span className="size-10 rounded-full bg-pago-yellow grid place-items-center">
                  <FaArrowUp className="text-xl scale-105" />
                </span>
              }
              value="send"
            >
              Send
            </NavItem>

            <NavItem
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
      </Fragment>
    </Tabs.Root>
  )
}

function NavItem({
  children,
  value,
  icon,
}: PropsWithChildren<{
  value: string
  icon: React.ReactNode
}>) {
  return (
    <Tabs.Trigger asChild value={value}>
      <button className="grid group place-content-center place-items-center">
        {icon}
        <span className="font-medium opacity-50 group-data-[state=active]:opacity-100">
          {children}
        </span>
      </button>
    </Tabs.Trigger>
  )
}
