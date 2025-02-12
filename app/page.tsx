import { FaArrowUp } from "react-icons/fa"

import DialogSend from "@/components/DialogSend"
import BalanceHolder from "@/components/BalanceHolder"
import ActionReceive from "@/components/ActionReceive"
import Transactions from "@/components/Transactions"
import { Button } from "@/components/ui/button"

import MainContainer from "./MainContainer"

export default function PageHome() {
  return (
    <MainContainer>
      <BalanceHolder />

      <div className="grid mt-20 grid-cols-2 gap-4">
        <ActionReceive />
        <DialogSend
          trigger={
            <Button variant="yellow">
              <span>Send</span>
              <FaArrowUp className="scale-125 rotate-45" />
            </Button>
          }
        />
      </div>

      <Transactions />
    </MainContainer>
  )
}
