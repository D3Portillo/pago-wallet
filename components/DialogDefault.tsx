import type { PropsWithChildren } from "react"
import type { DialogProps } from "@radix-ui/react-dialog"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

export default function DialogDefault({
  trigger,
  children,
  ...props
}: PropsWithChildren<{
  trigger: React.ReactNode
}> &
  DialogProps) {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {children}
        <div className="my-2" />
      </DrawerContent>
    </Drawer>
  )
}
