import { cn } from "@/lib/utils"
import type { HTMLProps } from "react"

export default function Input({
  className,
  endEnhancer,
  ...props
}: HTMLProps<HTMLInputElement> & {
  endEnhancer?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "border flex items-center bg-black/3 h-14 w-full px-4 rounded-xl",
        className
      )}
    >
      <input
        {...props}
        className="bg-transparent text-lg font-medium flex-grow h-full w-full outline-none"
      />
      {endEnhancer || null}
    </div>
  )
}
