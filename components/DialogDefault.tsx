import type { PropsWithChildren } from "react"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

export default function DialogDefault({
  trigger,
  children,
}: PropsWithChildren<{
  trigger: React.ReactNode
}>) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  )
}
