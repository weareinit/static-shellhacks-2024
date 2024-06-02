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
        <p className="xxl:text-[60px] xxl:mt-10 font-zoonaji text-4xl text-darker_cyan">
          The Largest Hackathon in the East Coast!
        </p>
        <div className="xxl:mt-5 flex items-center  justify-center">
          <p className="xxl:text-[30px] font-museo text-lg">Powered by </p>
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
          <div className="xxl:text-[40px] mt-5 text-[1.5rem] text-[#000000]">
            September 27th - 29th, 2024
          </div>
          <div className="xxl:text-[40px] text-[1.5rem] text-[#000000]">
            FIU&apos;s Graham Center - Miami, FL
          </div>
          <div className="xxl:text-5xl xxl:gap-4 mt-1 flex justify-center gap-2 text-2xl text-ferra">
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
        <div className="xxl:text-2xl relative bottom-3 h-11 w-11">
          <Image
            priority
            src="/assets/new/animation/scroll_for_more.gif"
            alt="scroll for more"
            fill
          />
        </div>
        <p className="xxl:text-2xl font-museoregular">scroll for more!</p>
      </div>
    </>
  );
};

export default LandingContent;
