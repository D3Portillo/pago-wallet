import { MdHome } from "react-icons/md"
import MainContainer from "./MainContainer"
import { IoMdContacts } from "react-icons/io"
import { FaArrowUp } from "react-icons/fa"

export default function MainNavigation() {
  return (
    <MainContainer className="border-t h-20 flex-grow-0 flex justify-around">
      <button className="grid place-content-center place-items-center">
        <span className="size-10 grid place-items-center">
          <MdHome className="text-3xl" />
        </span>
        <span className="font-medium opacity-50">Home</span>
      </button>

      <button className="grid place-content-center place-items-center">
        <span className="size-10 rounded-full bg-pago-yellow grid place-items-center">
          <FaArrowUp className="text-xl scale-105" />
        </span>
        <span className="font-medium opacity-50">Send</span>
      </button>

      <button className="grid place-content-center place-items-center">
        <span className="size-10 grid place-items-center">
          <IoMdContacts className="text-3xl" />
        </span>
        <span className="font-medium opacity-50">Contacts</span>
      </button>
    </MainContainer>
  )
}
