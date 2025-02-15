"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { isAddress } from "viem"

import { FaUserPlus } from "react-icons/fa"

import MainContainer from "@/app/MainContainer"
import ContactsList, { useContacts } from "./ContactsList"
import DialogDefault from "@/components/DialogDefault"

import { useAlchemy } from "@/lib/wallet"
import { cn } from "@/lib/utils"

import Input from "@/components/Input"
import { Button } from "@/components/ui/button"

export default function PageContacts() {
  const { alchemy } = useAlchemy(1) // Ethereum Mainnet

  const [isOpen, setIsOpen] = useState(false)
  const [contacts, addContacts] = useContacts()
  const [addingContact, setAddingContact] = useState({
    address: "",
    name: "",
  })

  useEffect(() => {
    return () => {
      // Reset values when dialog is closed
      setAddingContact({
        address: "",
        name: "",
      })
    }
  }, [isOpen])

  async function handleAddContact() {
    const { address: addy, name } = addingContact
    const isENSAddress = addy.endsWith(".eth")
    const CONTACT_ADDRESS = isENSAddress
      ? // We fetch the address for the given ENS
        (await alchemy.core.resolveName(addy)) || ""
      : addy

    if (!isAddress(CONTACT_ADDRESS)) return toast.error("Invalid address")

    addContacts((prev) => [
      ...prev,
      {
        address: CONTACT_ADDRESS,
        name,
        ...(isENSAddress
          ? {
              ens: addy,
            }
          : {}),
      },
    ])

    toast.success("Contact added 🥳")
    // We close the dialog
    setIsOpen(false)
  }

  return (
    <MainContainer>
      <nav
        className={cn(
          contacts.length < 1 && "mb-4",
          "flex items-center justify-between gap-4 border-b pb-4"
        )}
      >
        <h1 className="text-xl font-semibold">Your contacts</h1>

        <DialogDefault
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <button className="underline flex items-center gap-2.5 text-lg font-medium">
              <span>Add</span>
              <FaUserPlus className="text-xl" />
            </button>
          }
        >
          <h1 className="text-2xl font-bold">Add contact</h1>

          <label className="block w-full mt-4">
            <p className="mb-1">ENS or address</p>
            <Input
              value={addingContact.address}
              onChange={(e) =>
                setAddingContact({
                  ...addingContact,
                  address: e.currentTarget.value.trim(),
                })
              }
              placeholder="d3portillo.eth"
            />
          </label>

          <label className="block w-full mt-2">
            <p className="mb-1">Contact name</p>
            <Input
              value={addingContact.name}
              onChange={(e) =>
                setAddingContact({
                  ...addingContact,
                  name: e.currentTarget.value.trim(),
                })
              }
              placeholder="Ronaldinho"
            />
          </label>

          <Button
            onClick={handleAddContact}
            disabled={!addingContact.address || !addingContact.name}
            className="text-xl mt-12 w-full"
          >
            Confirm & Save
          </Button>
        </DialogDefault>
      </nav>

      <ContactsList />
    </MainContainer>
  )
}
