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
    </MainContainer>
  )
}
