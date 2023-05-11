import React, { useState, useEffect } from "react"

import RegisterModal from "../registration/RegisterModal"
import Image from "next/image"
import Button from "../input/Button"
import Link from "next/link"

function SandSection() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [showModal])

  return (
    <section className="grid col-span-1 md:col-span-5 justify-center items-center align-middle min-h-[60vh] relative">
      {/* <BeachChairCollection /> */}
      <article className="grid justify-center justify-items-center z-10">
        <Image src="/assets/shellhacks_logo.gif" alt="ShellHacks2023" width={400} height={150} />
        <h2 className="text-blue text-center font-pixel text-lg m-2">{"Florida's Largest Hackathon"}</h2>
        <div className="flex flex-row justify-center items-center">
          <Button
            className="mr-4"
            onClick={(e) => {
              e.preventDefault()
              setShowModal((prev) => !prev)
            }}
          >
            <h2>Register Now!</h2>
          </Button>

          <Link href="/dashboard">
            <Button className="">
              <h2>Hacker Dashboard</h2>
            </Button>
          </Link>
        </div>
      </article>
      {showModal && (
        <RegisterModal
          toClose={(event) => {
            event.preventDefault()
            setShowModal(false)
          }}
        />
      )}
    </section>
  )
}

export default SandSection
