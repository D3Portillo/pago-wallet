import { Button } from "@/components/ui/button"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"

import DialogSend from "@/components/DialogSend"
import BalanceHolder from "@/components/BalanceHolder"
import MainContainer from "./MainContainer"
import ActionReceive from "@/components/ActionReceive"
import Transactions from "@/components/Transactions"

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

      <nav className="flex mt-10 items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Transactions</h3>
        <button className="underline text-lg font-medium">See all</button>
      </nav>

      <Transactions />
      <section className="mt-4 flex flex-col gap-2">
        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-pago-green/7 text-pago-green size-14 grid place-items-center">
            <FaArrowDown className="rotate-45 scale-110" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Received</h4>
            <p className="opacity-70 h-6">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-2xl">
              <span className="font-mono">$</span>20
            </h4>
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-pago-red/7 text-pago-red size-14 grid place-items-center">
            <FaArrowUp className="rotate-45 scale-110" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70 h-6">Completed · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-2xl">
              <span className="font-mono">$</span>20
            </h4>
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 text-black/60 size-14 grid place-items-center">
            <IoMdAdd className="text-xl scale-[1.45]" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Add</h4>
            <p className="opacity-70 h-6">Completed · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-2xl">
              <span className="font-mono">$</span>5
            </h4>
          </div>
        </button>
      </section>
    </MainContainer>
  )
}
