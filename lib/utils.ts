import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function noOp() {}

export const beautifyAddress = (
  addr: string = "",
  chunkSize = 5,
  separator = "..."
) =>
  `${addr.substr(0, chunkSize)}${separator}${addr.substr(
    -chunkSize,
    chunkSize
  )}`
