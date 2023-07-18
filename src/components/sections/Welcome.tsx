import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

import { SiDiscord } from "react-icons/si";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";

import Button from "../input/Button";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import TitleLogo from "../decorations/TitleLogo";

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
    <section className="flex flex-col items-center justify-center h-fit min-h-screen mt-5">
      <TitleLogo />
      <div className="my-4 flex flex-col justify-center items-center">
        {/* TODO : Sometimes Florida's Largest Hackathon is way bigger than logo. Need to fix */}
        <h2 className="m-2 text-crate_brown text-center font-console font-bold lg:text-3xl text-2xl">{"Florida's Largest Hackathon"}</h2>
        <MicrosoftBoard />
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">Kovens Conference Center @ Florida Int. University</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel md:text-lg">September 15-17, 2023</h3>
      </div>
      <nav className="grid grid-cols-1 grid-rows-3 justify-center items-center my-1">
        {finishedRegistration ? (
          <h2 className=" text-pink font-bold text-center font-pixel text-lg m-2 col-span-full">
            Thank you for registering!
            <br />
            Check your email for next steps...
          </h2>
        ) : (
          <div className="w-full col-span-full flex justify-center">
            <Button
              className="col-span-full w-full bg-deep_blue hover:bg-pink text-white text-center flex items-center justify-center drop-shadow-blue min-h-[50px] h-[10vw] max-h-[60px]"
              onClick={(e) => {
                e.preventDefault();
                user ? router.push("/dashboard") : setShowRegistration(true);
              }}
            >
              <h2 className="font-console text-xl text-center hover:scale-110 transition ease-in-out">{user ? "Hacker Dashboard" : "Register Now!"}</h2>
            </Button>
          </div>
        )}

        <div className=" row-start-2 col-span-full space-x-2 mt-1 grid grid-cols-2">
          <Link href={user ? "/api/auth/logout" : "/dashboard"}>
            <Button className="bg-dark_brown text-tan col-span-1 min-w-[150px] min-h-[40px] w-[20vw] max-w-[250px] max-h-[50px] h-[10vw] drop-shadow-light_brown">
              <h2 className="font-pixel text-md py-1 hover:scale-110 transition ease-in-out">{user ? "LOG OUT" : "LOG IN"}</h2>
            </Button>
          </Link>

          <Link href="https://discord.com/invite/init">
            <Button className="bg-dark_brown text-tan col-span-1 min-w-[150px] min-h-[40px] w-[20vw] max-w-[250px] max-h-[50px] h-[10vw] drop-shadow-light_brown">
              <h2 className="font-pixel text-md py-1 hover:scale-110 transition ease-in-out">JOIN DISCORD</h2>
            </Button>
          </Link>
        </div>

        <div className="flex flex-row space-x-3 justify-center col-span-full row-start-3 self-start p-2">
          <Link href="https://discord.com/invite/init" target="_blank">
            <SiDiscord size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://www.instagram.com/initofficial/" target="_blank">
            <AiFillInstagram size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://twitter.com/initfiu" target="_blank">
            <AiFillTwitterSquare size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
          </Link>

          <Link href="https://www.facebook.com/init.fiu" target="_blank">
            <AiFillFacebook size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://www.linkedin.com/company/initofficial/" target="_blank">
            <AiFillLinkedin size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
          </Link>
        </div>
      </nav>
    </section>
  );
}

export default Welcome;
