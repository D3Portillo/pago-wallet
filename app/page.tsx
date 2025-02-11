import { Button } from "@/components/ui/button"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

import MainContainer from "./MainContainer"
import { IoMdAdd } from "react-icons/io"

export default function Home() {
  return (
    <MainContainer>
      <div className="grid place-items-center place-content-center">
        <button className="active:scale-[0.98]">
          <div className="font-bold text-4xl sm:text-5xl">$232.232</div>
          <div className="inline-flex mt-0.5 items-center gap-1">
            <span className="text-lg font-medium opacity-70">Add funds</span>
            <IoMdAdd className="opacity-70 text-xl" />
          </div>
        </button>
      </div>
      <div className="grid mt-20 grid-cols-2 gap-4">
        <Button className="text-2xl border-2 bg-black/3 text-black flex items-center gap-3 h-14 rounded-xl font-bold">
          <span>Receive</span>
          <FaArrowDown className="rotate-45 scale-125" />
        </Button>
        <Button className="text-2xl border-2 border-black bg-pago-yellow text-black flex items-center gap-3 h-14 rounded-xl font-bold">
          <span>Send</span>
          <FaArrowUp className="scale-125 rotate-45" />
        </Button>
      </div>

      <nav className="flex mt-10 items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Transactions</h3>
        <button className="underline text-lg font-medium">See all</button>
      </nav>

      <section className="mt-4 flex flex-col gap-2">
        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Received</h4>
            <p className="opacity-70 h-6">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">$20</h4>
            <p className="opacity-70 h-6" />
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70 h-6">Completed · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">$20</h4>
            <p className="opacity-70 h-6" />
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Add</h4>
            <p className="opacity-70 h-6">Completed · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">$5</h4>
            <p className="opacity-70 h-6" />
          </div>
        </button>
      </section>
    </MainContainer>
  )
}
