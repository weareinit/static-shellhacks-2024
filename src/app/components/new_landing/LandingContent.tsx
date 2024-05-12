import Image from "next/image";
import LandingButtons from "./LandingButtons";
import {
  FaDiscord,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const LandingContent = () => {
  return (
    <>
      <div className="text-center">
        <p className="text-darker_cyan font-zoonaji text-4xl">
          The Largest Hackathon in the East Coast!
        </p>
        <div className="flex justify-center">
          <p className="font-museo mt-1 text-lg">Powered by </p>
          <div className="relative right-3 top-[0.1625rem] h-8 w-28">
            <Image
              src="/assets/new/logo/Nvidia_Logo.png"
              alt="Nvidia Logo"
              fill
            />
          </div>
        </div>
        <div className="font-museoregular">
          <div className="mt-5 text-[1.5rem] text-[#000000]">
            September 27th - 29th, 2024
          </div>
          <div className="text-[1.75rem] text-[#000000]">
            FIU&apos;s Grahams Center - Miami, FL
          </div>
          <div className="text-ferra mt-1 flex justify-center gap-2 text-2xl">
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
        <div className="relative bottom-3 h-11 w-11">
          <Image
            src="/assets/new/animation/scroll_for_more.gif"
            alt="scroll for more"
            fill
          />
        </div>
        <p className="font-museoregular">scroll for more!</p>
      </div>
    </>
  );
};

export default LandingContent;
