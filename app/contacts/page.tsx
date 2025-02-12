"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import MainContainer from "@/app/MainContainer"

const atomContacts = atomWithStorage("pago.contacts", [])

export default function PageContacts() {
  const [contacts, addContact] = useAtom(atomContacts)

  return (
    <MainContainer>
      <h1 className="text-xl font-semibold border-b pb-4">Your contacts</h1>

      <div className="bg-black/3 rounded-xl px-8 py-14 mt-4">
        <p className="text-center font-medium opacity-75">
          Oh, it looks very empty here 😢
        </p>
      </div>
    </MainContainer>
  )
}
