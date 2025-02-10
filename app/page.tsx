import { Button } from "@/components/ui/button"
import { FaArrowUp } from "react-icons/fa"

import MainContainer from "./MainContainer"

export default function Home() {
  return (
    <MainContainer>
      <div className="grid place-items-center place-content-center">
        <h1 className="font-bold text-5xl">$232.232 USD</h1>
        <h2 className="text-3xl font-medium opacity-70">0.0032 ETH</h2>
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
    </MainContainer>
  )
}
