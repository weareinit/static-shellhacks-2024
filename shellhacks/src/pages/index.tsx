import Button from "@/components/Button";
import SandSection from "@/components/sections/SandSection";
import ShorelineSection from "@/components/sections/ShorelineSection";
import Image from "next/image";
import GrassLine from "@/components/GrassLine";

export default function Home() {
  return (
    <main className="bg-sand">
      <GrassLine />
      <SandSection />
      <ShorelineSection />
    </main>
  );
}
