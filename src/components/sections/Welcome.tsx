import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

import Button from "../input/Button";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import TitleLogo from "../decorations/TitleLogo";
import SocialButtons from "./SocialButtons";

function MicrosoftBoard() {
  return (
    <div className="pointer-events-none select-none relative bg-caramel_brown h-[60px] w-[300px] flex justify-center items-center m-4 border-2 border-dark_brown drop-shadow-light_brown">
      <div className="pointer-events-none select-none absolute top-1 left-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute bottom-1 left-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute bottom-1 right-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      <div className="pointer-events-none select-none absolute top-1 right-1 text-crate_brown font-serif text-[4px] m-0 p-0 shadow-white">■</div>
      {/* Weird mt-[2px] is to align with SVG */}
      <h3 className="font-pixel text-crate_brown text-sm uppercase mt-[2px]">Powered By</h3>
      <Image src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" width={125} height={50} className="ml-3" />
    </div>
  );
}

function Welcome() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();
  const { user } = useUser();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center h-fit min-h-screen mt-5" id="welcome">
      <TitleLogo />
      <div className="my-4 flex flex-col justify-center items-center">
        {/* TODO : Sometimes Florida's Largest Hackathon is way bigger than logo. Need to fix */}
        <h2 className="m-2 text-crate_brown text-center font-console font-bold lg:text-3xl text-2xl">{"Florida's Largest Hackathon"}</h2>
        <MicrosoftBoard />
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">Florida International University</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">Biscayne Bay Campus | Miami, Florida</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">September 15-17, 2023</h3>
      </div>
      <nav className="grid grid-cols-2 justify-center items-center my-1 place-content-start gap-y-3">
        <div className="w-full col-span-full flex justify-center">
          <Button
            className="col-span-full w-[40vw] max-w-[500px] min-w-[300px] bg-deep_blue hover:bg-pink text-white text-center flex items-center justify-center drop-shadow-teal hover:drop-shadow-pink min-h-[50px] h-[10vw] max-h-[60px] my-1"
            onClick={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            <h2 className="font-console text-xl text-center hover:scale-110 transition ease-in-out">{"Hacker Dashboard"}</h2>
          </Button>
        </div>
        <div className="w-full col-span-full flex justify-center">
          <Link href={user ? "/api/auth/logout" : "/dashboard"}>
            <Button className="bg-dark_brown text-tan min-w-[300px] min-h-[40px] w-[40vw] max-w-[500px] max-h-[50px] h-[10vw] drop-shadow-light_brown">
              <h2 className="font-pixel text-md py-1 hover:scale-110 transition ease-in-out">{user ? "LOG OUT" : "LOG IN"}</h2>
            </Button>
          </Link>
        </div>

        <SocialButtons />
      </nav>
    </section>
  );
}

export default Welcome;
