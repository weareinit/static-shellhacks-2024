import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "../input/Button";
import { useShowRegistrationContext } from "@/app/hooks/ShowRegistrationContext";
import TitleLogo from "../decorations/TitleLogo";
import SocialButtons from "./SocialButtons";

function MicrosoftBoard() {
  return (
    <div className="pointer-events-none select-none relative bg-caramel_brown h-[60px] w-[300px] flex justify-center items-center m-4 border-2 border-dark_brown drop-shadow-light_brown">
      <div className="pointer-events-none select-none absolute top-1 left-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute bottom-1 left-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute bottom-1 right-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute top-1 right-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      {/* Weird mt-[2px] and ml-[17px] is to align with SVG */}
      <h3 className="font-pixel text-crate_brown text-sm uppercase mt-[2px] ml-[17px]">Powered By</h3>
      <Image src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" width={125} height={50} className="" />
    </div>
  );
}

function Welcome() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();
  // const { user } = useUser();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center h-fit min-h-screen mt-5" id="welcome">
      <TitleLogo />
      <div className="my-4 flex flex-col justify-center items-center">
        <h2 className="m-2 text-crate_brown text-center font-console font-bold lg:text-3xl text-2xl">{"Florida's Largest Hackathon"}</h2>
        <MicrosoftBoard />
        <h2 className="my-4 text-deep_blue break-normal text-center">
          ShellHacks 2023 is Over! <br className="md:hidden" />
          Thanks for Hacking with Us!
          {" :)"}
        </h2>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">Florida International University</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">Biscayne Bay Campus | Miami, Florida</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">September 15-17, 2023</h3>
      </div>
      <nav className="grid grid-cols-2 justify-center items-center my-1 place-content-start gap-y-3">
        <SocialButtons />
      </nav>
    </section>
  );
}

export default Welcome;
