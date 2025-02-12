"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import MainContainer from "@/app/MainContainer"
import { FaUserPlus } from "react-icons/fa"

const atomContacts = atomWithStorage("pago.contacts", [])

export default function PageContacts() {
  const [contacts, addContact] = useAtom(atomContacts)

  return (
    <MainContainer>
      <nav className="flex items-center justify-between gap-4 border-b pb-4">
        <h1 className="text-xl font-semibold">Your contacts</h1>
        <button className="underline flex items-center gap-2.5 text-lg font-medium">
          <span>Add</span>
          <FaUserPlus className="text-xl" />
        </button>
      </nav>

      <div className="bg-black/3 rounded-xl px-8 py-14 mt-4">
        <p className="text-center font-medium opacity-75">
          Oh, it looks very empty here 😢
        </p>
      </div>
    </MainContainer>
  )
}
