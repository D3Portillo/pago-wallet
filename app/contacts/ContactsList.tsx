"use client"

import type { Address } from "viem"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { AddressBox } from "@/components/AddressBox"
import { cn } from "@/lib/utils"

export type Contact = {
  address: Address
  name: string
  ens?: string
}

const atomContacts = atomWithStorage("pago.contacts", [] as Contact[])

export const useContacts = () => {
  const [getter, setter] = useAtom(atomContacts)
  return [getter.sort((a, b) => a.name.localeCompare(b.name)), setter] as const
  // Default sorting by name
}

export default function ContactsList({
  onSelect,
  activeAddress,
}: {
  onSelect?: (contact: Contact) => void
  activeAddress?: Address
}) {
  const [contacts] = useContacts()

  return (
    <section className="flex flex-col">
      {contacts.length < 1 && (
        <div className="bg-black/3 rounded-xl px-8 py-14">
          <p className="text-center font-medium opacity-75">
            Oh, it looks very empty here 😢
          </p>
        </div>
      )}

      {contacts.map((contact) => {
        const isActive = activeAddress === contact.address

        return (
          <div
            role={onSelect ? "button" : "listitem"}
            onClick={() => onSelect?.(contact)}
            key={`${contact.address}-${contact.name}`}
            className={cn(
              "flex border-b items-center gap-4 py-4",
              contacts.length > 1 && "last:border-b-0",
              onSelect && "cursor-pointer",
              isActive &&
                "bg-gradient-to-b from-pago-yellow/0 to-pago-yellow/10"
            )}
          >
            <div
              className={cn(
                "size-8 shrink-0 outline-2 outline-transparent rounded-full overflow-hidden",
                isActive && "outline-black outline"
              )}
            >
              <AddressBox address={contact.address} className="size-full" />
            </div>

            <p className="blok flex-grow">{contact.name}</p>

            <span className="text-[80%] font-bold py-0.5 bg-black/3 rounded-lg px-2 border">
              {contact.ens || contact.address}
            </span>
          </div>
        )
      })}
    </section>
  )
}
