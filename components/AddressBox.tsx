"use client"

import { useMemo } from "react"

// @ts-ignore
import { renderIcon, createIcon } from "@download/blockies"

export function AddressBox({
  address,
  className,
}: {
  address: string
  className?: string
}) {
  const imageURL = useMemo(() => {
    return getBlockieURLForAddress(address)
  }, [address])

  return (
    <figure className={className}>
      <img alt="" className="object-cover size-full" src={imageURL} />
    </figure>
  )
}

export function getBlockieURLForAddress(address?: string) {
  if (address && typeof window !== "undefined") {
    const canvas = document.createElement("canvas")
    renderIcon(
      createIcon({
        seed: address,
        size: 15, // default: 10
        scale: 3, // default: 5
      }),
      canvas
    )
    return canvas.toDataURL("base64")
  }

  return "/"
}
