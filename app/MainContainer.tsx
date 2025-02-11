import { cn } from "@/lib/utils"
import type { PropsWithChildren, ElementType } from "react"

export default function MainContainer({
  children,
  className,
  as: Container = "div",
}: PropsWithChildren<{
  className?: string
  as?: ElementType
}>) {
  return (
    <Container
      className={cn(
        "w-full flex-grow md:mb-4 px-3 max-w-lg mx-auto",
        className
      )}
    >
      {children}
    </Container>
  )
}
