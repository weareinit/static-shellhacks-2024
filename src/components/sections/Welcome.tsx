import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SiDiscord } from "react-icons/si";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";

import Button from "../input/Button";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import TitleLogo from "../decorations/TitleLogo";

function Welcome() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();
  return (
    <section className="flex flex-col items-center justify-center min-w-96 h-fit min-h-screen">
      <TitleLogo />
      <div className="my-4">
        {/* TODO : Sometimes Florida's Largest Hackathon is way bigger than logo. Need to fix */}
        <h2 className="m-2 text-crate_brown text-center font-console font-bold lg:text-3xl md:text-2xl text-lg">{"Florida's Largest Hackathon"}</h2>
        <h3 className="m-2 text-crate_brown text-center font-pixel text-lg">Kovens Conference Center at Florida Int. University</h3>
        <h3 className="m-2 text-crate_brown text-center font-pixel text-lg">September 15-17, 2023</h3>
      </div>
      <nav className="grid grid-cols-1 grid-rows-3 justify-center items-center my-1">
        {finishedRegistration ? (
          <h2 className=" text-pink font-bold text-center font-pixel text-lg m-2 col-span-full">
            Thank you for registering!
            <br />
            Check your email for next steps...
          </h2>
        ) : (
          <div className="w-full col-span-full flex justify-center rounded-pixel h-20">
            <Button
              className="col-span-full w-full bg-pink text-white text-center rounded-pixel-primary"
              onClick={(e) => {
                e.preventDefault();
                setShowRegistration(true);
              }}
            >
              <h2 className="font-extrabold text-xl text-center hover:scale-110 transition ease-in-out">Register Now!</h2>
            </Button>
          </div>
        )}

        <div className=" row-start-2 col-span-full space-x-2 mt-1 grid grid-cols-2">
          <Link href="/dashboard">
            <Button className="md:min-w-[275px] md:min-h-[50px] bg-caramel_brown text-white col-span-1 w-full h-16 rounded">
              <h2 className="font-pixel text-md py-1 hover:scale-110 transition ease-in-out">DASHBOARD</h2>
            </Button>
          </Link>

          <Link href="mailto:team@weareinit.org">
            <Button className="md:min-w-[275px] md:min-h-[50px] bg-caramel_brown text-white col-span-1 w-full h-16 rounded">
              <h2 className="font-pixel text-md py-1 hover:scale-110 transition ease-in-out">SPONSOR US</h2>
            </Button>
          </Link>
        </div>

        <div className="flex flex-row space-x-3 justify-center col-span-full row-start-3 self-start p-2">
          <Link href="https://discord.com/invite/init" target="_blank">
            <SiDiscord size={45} className="hover:fill-pink hover:cursor-pointer fill-caramel_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://www.instagram.com/initofficial/" target="_blank">
            <AiFillInstagram size={45} className="hover:fill-pink hover:cursor-pointer fill-caramel_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://twitter.com/initfiu" target="_blank">
            <AiFillTwitterSquare size={45} className="hover:fill-pink hover:cursor-pointer fill-caramel_brown hover:scale-125 transition ease-in-out" />
          </Link>

          <Link href="https://www.facebook.com/init.fiu" target="_blank">
            <AiFillFacebook size={45} className="hover:fill-pink hover:cursor-pointer fill-caramel_brown hover:scale-125 transition ease-in-out" />
          </Link>
          <Link href="https://www.linkedin.com/company/initofficial/" target="_blank">
            <AiFillLinkedin size={45} className="hover:fill-pink hover:cursor-pointer fill-caramel_brown hover:scale-125 transition ease-in-out" />
          </Link>
        </div>
      </nav>
    </section>
  );
}

export default Welcome;
