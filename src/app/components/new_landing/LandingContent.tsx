import Image from "next/image";
import LandingButtons from "./LandingButtons";
import {
  FaDiscord,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useSession } from "next-auth/react";

const LandingContent = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="text-center">
        <p className="font-zoonaji text-4xl text-darker_cyan xxl:mt-10 xxl:text-[60px]">
          The Largest Hackathon in the East Coast!
        </p>
        <div className="flex items-center justify-center  xxl:mt-5">
          <p className="font-museo text-lg xxl:text-[30px]">Powered by </p>
          <div className=" relative right-3 flex h-[3rem] w-[12rem]">
            <Image
              priority
              src="/assets/new/logo/Nvidia_Logo.png"
              alt="Nvidia Logo"
              layout="fill"
            />
          </div>
        </div>
        <div className="font-museoregular">
          <div className="mt-5 text-[1.5rem] text-[#000000] xxl:text-[40px]">
            September 27th - 29th, 2024
          </div>
          <div className="text-[1.5rem] text-[#000000] xxl:text-[40px]">
            FIU&apos;s Graham Center - Miami, FL
          </div>
          <div className="mt-1 flex justify-center gap-2 text-2xl text-ferra xxl:gap-4 xxl:text-5xl">
            <div className="cursor-pointer">
              <FaDiscord />
            </div>
            <div className="cursor-pointer">
              <AiFillInstagram />
            </div>
            <div className="cursor-pointer">
              <FaTwitterSquare />
            </div>
            <div className="cursor-pointer">
              <FaFacebookSquare />
            </div>
            <div className="cursor-pointer">
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
      <LandingButtons />
      {
        // i think the scroll for more gif is ugly. there is a way to do it with json lottie animations:
        // https://app.lottiefiles.com/animation/49b666a1-2cde-4881-971c-376b26b09ce9?channel=web&source=public-animation&panel=download
      }
      <div className="mt-7 flex justify-center">
        <div className="relative bottom-3 h-11 w-11 xxl:text-2xl">
          <Image
            priority
            src="/assets/new/animation/scroll_for_more.gif"
            alt="scroll for more"
            fill
          />
        </div>
        <p className="font-museoregular xxl:text-2xl">scroll for more!</p>
      </div>
    </>
  );
};

export default LandingContent;
