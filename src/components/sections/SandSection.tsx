import React, { useState, useEffect } from "react";

import {
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";
import { SiDiscord } from "react-icons/si";

import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import RegisterModal from "../registration/RegisterModal";
import Image from "next/image";
import Button from "../input/Button";
import Link from "next/link";

function SandSection() {
  const { showRegistration, setShowRegistration, finishedRegistration } =
    useShowRegistrationContext();

  useEffect(() => {
    if (showRegistration) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showRegistration]);

  return (
    <section className="grid col-span-1 md:col-span-5 justify-center items-center align-middle min-h-[60vh] relative">
      {/* <BeachChairCollection /> */}
      <article className="grid justify-center justify-items-center z-10">
        <Image
          src="/assets/shellhacks_logo.gif"
          alt="ShellHacks2023"
          width={400}
          height={150}
        />
        <div className="my-2">
          <h2 className="text-blue text-center font-pixel text-lg underline">
            {"Florida's Largest Hackathon"}
          </h2>
          <h3 className="text-blue text-center font-pixel text-md">
            September | Miami, Florida
          </h3>
        </div>
        <nav className="grid sm:grid-cols-4 grid-cols-1 grid-rows-3 justify-center items-center my-1">
          {finishedRegistration ? (
            <h2 className=" text-green-600 text-center font-pixel text-lg m-2 col-span-full">
              Thank you for registering!<br/>
              Check your email for next steps...
            </h2>
          ) : (
            <div className="w-full col-span-full flex justify-center">
              <Button
                className="col-span-full w-full bg-green-600"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRegistration(true);
                }}
              >
                <h2>Register Now!</h2>
              </Button>
            </div>
          )}

          <div className=" row-start-2 col-span-full space-x-2 mt-1">
            <Link href="/dashboard">
              <Button className="sm:min-w-[175px]">
                <h2>Dashboard</h2>
              </Button>
            </Link>

            <Link href="mailto:team@weareinit.org">
              <Button className="sm:min-w-[175px]">
                <h2>Sponsor Us</h2>
              </Button>
            </Link>
          </div>

          <div className="flex flex-row space-x-1 justify-center col-span-full my-1 row-start-3">
            <Link href="https://discord.com/invite/init" target="_blank">
              <SiDiscord
                size={30}
                className="hover:fill-green-600 hover:cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.instagram.com/initofficial/"
              target="_blank"
            >
              <AiFillInstagram
                size={30}
                className="hover:fill-green-600 hover:cursor-pointer"
              />
            </Link>
            <Link href="https://twitter.com/initfiu" target="_blank">
              <AiFillTwitterSquare
                size={30}
                className="hover:fill-green-600 hover:cursor-pointer"
              />
            </Link>

            <Link href="https://www.facebook.com/init.fiu" target="_blank">
              <AiFillFacebook
                size={30}
                className="hover:fill-green-600 hover:cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/initofficial/"
              target="_blank"
            >
              <AiFillLinkedin
                size={30}
                className="hover:fill-green-600 hover:cursor-pointer"
              />
            </Link>
          </div>
        </nav>
      </article>
      {showRegistration && (
        <RegisterModal
          toClose={(event) => {
            event.preventDefault();
            setShowRegistration(false);
          }}
        />
      )}
    </section>
  );
}

export default SandSection;
