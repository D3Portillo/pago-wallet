"use client"

import type { Contact } from "@/app/contacts/ContactsList"
import type { Address } from "viem"

import { useState } from "react"

import DialogDefault from "@/components/DialogDefault"
import ContactsList, { useContacts } from "@/app/contacts/ContactsList"
import { Button } from "@/components/ui/button"

export default function DialogContactSelector({
  trigger,
  onSelect,
  showActiveAddress,
}: {
  trigger: React.ReactNode
  showActiveAddress?: Address
  onSelect: (contact: Contact) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [contacts] = useContacts()

  const closeModal = () => setIsOpen(false)

  return (
    <DialogDefault onOpenChange={setIsOpen} open={isOpen} trigger={trigger}>
      <h1 className="text-2xl font-bold">Choose contact</h1>
      <p className="mt-1">Select a contacts to send the payment</p>

      {contacts.length > 1 ? <hr className="mt-4" /> : <div className="mb-4" />}

      <ContactsList
        activeAddress={showActiveAddress}
        onSelect={(contact) => {
          onSelect(contact)
          closeModal()
        }}
      />

      <Button
        variant="ghost"
        className="text-xl mt-8 w-full"
        onClick={closeModal}
      >
        Go back
      </Button>
    </DialogDefault>
  )
}
