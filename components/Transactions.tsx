"use client"

import { useWalletTransactions } from "@/lib/wallet"
import { Fragment } from "react"
import { useAccount } from "wagmi"
import { formatDistanceToNow } from "date-fns"

import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io"
import { toPrecision } from "@/lib/numbers"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { IoChevronBackSharp } from "react-icons/io5"

export default function Transactions({ isFullPage }: { isFullPage?: boolean }) {
  const { address } = useAccount()
  const { data: txs = [] } = useWalletTransactions(address)

  if (txs.length < 1) return null

  return (
    <Fragment>
      <nav
        className={cn(
          isFullPage ? "pb-6 justify-start" : "mt-10 justify-between",
          "flex items-center gap-3"
        )}
      >
        {isFullPage ? (
          <Link href="/" className="text-2xl py-1 pl-2 opacity-60">
            <IoChevronBackSharp />
          </Link>
        ) : null}

        <h3 className="text-xl font-semibold">
          {isFullPage ? "All transactions" : "Transactions"}
        </h3>

        {isFullPage ? null : (
          <Link href="/history" className="underline text-lg font-medium">
            See all
          </Link>
        )}
      </nav>

      <section className="mt-4 flex flex-col gap-2">
        {txs.slice(0, isFullPage ? txs.length : 7).map((tx) => {
          const isReceived = tx.to === address?.toLowerCase()
          const isSent = tx.from === address?.toLowerCase()

          return (
            <Transaction
              key={`${tx.hash}-${tx.date}`}
              {...tx}
              icon={
                isReceived ? (
                  <div className="rounded-full bg-pago-green/7 text-pago-green size-14 grid place-items-center">
                    <FaArrowDown className="rotate-45 scale-110" />
                  </div>
                ) : isSent ? (
                  <div className="rounded-full bg-pago-red/7 text-pago-red size-14 grid place-items-center">
                    <FaArrowUp className="rotate-45 scale-110" />
                  </div>
                ) : (
                  <div className="rounded-full bg-black/3 text-black/60 size-14 grid place-items-center">
                    <IoMdAdd className="text-xl scale-[1.45]" />
                  </div>
                )
              }
              slug={isReceived ? "Received" : isSent ? "Sent" : "Add"}
              status="completed"
            />
          )
        })}
      </section>
    </Fragment>
  )
}

function Transaction({
  icon,
  slug,
  status,
  date,
  value,
}: {
  icon: React.ReactNode
  slug: string
  status: "completed" | "cancelled"
  date: Date
  value: number
}) {
  return (
    <button className="flex py-2 text-left items-center gap-4">
      {icon}
      <div className="flex-grow">
        <h4 className="font-bold text-xl">{slug}</h4>
        <p className="opacity-70 h-6">
          Completed ·{" "}
          {formatDistanceToNow(date, { addSuffix: false })
            .replace(/about/, "")
            .trim()}
        </p>
      </div>
      <div className="text-right pb-1">
        <h4 className="font-bold text-2xl">
          <span className="font-mono">$</span>
          {toPrecision(value, 4)}
        </h4>
      </div>
    </button>
  )
}
