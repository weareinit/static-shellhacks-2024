import Button from "@/components/Button"
import SandSection from "@/components/sections/SandSection"
import ShorelineSection from "@/components/sections/ShorelineSection"
import Image from "next/image"
import GrassLine from "@/components/GrassLine"

export default function Home() {
  return (
    <main className="bg-sand h-screen grid grid-cols-1 md:grid-cols-9">
      <ShorelineSection />
      <SandSection />
      <GrassLine />
    </main>
  )
}
