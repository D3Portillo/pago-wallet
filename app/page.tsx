import { Button } from "@/components/ui/button"
import { FaArrowUp } from "react-icons/fa"

import MainContainer from "./MainContainer"

export default function Home() {
  return (
    <MainContainer>
      <div className="grid place-items-center place-content-center">
        <h1 className="font-bold text-4xl">$232.232 USD</h1>
        <h2 className="text-2xl font-medium opacity-70">0.0032 ETH</h2>
      </div>
      <div className="grid mt-20 grid-cols-2 gap-4">
        <Button className="text-2xl border-2 border-black bg-white text-black flex items-center gap-3 h-14 rounded-xl font-bold">
          <span>Receive</span>
          <FaArrowUp className="rotate-180 scale-125" />
        </Button>
        <Button className="text-2xl flex items-center gap-3 h-14 rounded-xl font-bold">
          <span>Send</span>
          <FaArrowUp className="scale-125" />
        </Button>
      </div>

      <nav className="flex mt-10 items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Transactions</h3>
        <button className="underline text-lg font-medium">See all</button>
      </nav>

      <section className="mt-4 flex flex-col gap-2">
        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">20USD</h4>
            <p className="opacity-70">0.0032 ETH</p>
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">20USD</h4>
            <p className="opacity-70">0.0032 ETH</p>
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">20USD</h4>
            <p className="opacity-70">0.0032 ETH</p>
          </div>
        </button>

        <button className="flex py-2 text-left items-center gap-4">
          <div className="rounded-full bg-black/3 size-14" />
          <div className="flex-grow">
            <h4 className="font-bold text-xl">Sent</h4>
            <p className="opacity-70">Cancelled · Apr 12</p>
          </div>
          <div className="text-right">
            <h4 className="font-bold text-xl">20USD</h4>
            <p className="opacity-70">0.0032 ETH</p>
          </div>
        </button>
      </section>
    </MainContainer>
  )
}
