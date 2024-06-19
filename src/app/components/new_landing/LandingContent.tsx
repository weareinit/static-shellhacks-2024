import Image from "next/image";
import LandingButtons from "./LandingButtons";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

const LandingContent = () => {
  return (
    <>
      <div className="text-center">
        <p className="font-zoonaji text-4xl text-darker_cyan xxs:mt-0 xxs:text-[18px] xsm:mt-3 xsm:text-[26px] sm:mt-3 sm:text-[23px] md:mt-4 md:text-[25px] lg:mt-8 lg:text-[30px] xlg:mt-9 xlg:text-[40px] xxl:mt-10 xxl:text-[60px]">
          Florida&apos;s Largest Hackathon!
        </p>
        <div className="flex items-center justify-center gap-2 xxl:mt-5">
          <p className="mt-[1px] font-museo text-lg xxs:text-[15px] md:text-[15px] lg:text-[20px] xlg:text-[20px] xxl:text-[30px]">
            Powered by
          </p>
          {/* <div className="relative  bottom-1 mt-2 flex scale-90 xxs:h-[2rem]  xxs:w-[8rem] sm:h-[1.5rem] sm:w-[6rem] md:h-[2rem] md:w-[8rem] lg:h-[3rem] lg:w-[12rem]"> */}
          <Image
            priority
            src="/assets/new/logo/micro_logo.png"
            alt="Microsoft Logo"
            width={100}
            height={60}
          />
          {/* </div> */}
        </div>
        <div className="font-museoregular">
          <div className="text-[1.5rem] text-[#000000] xxs:text-[15px] xsm:text-[18px] md:text-[18px] lg:text-[23px] xlg:mt-3 xlg:text-[20px] xxl:mt-5 xxl:text-[40px]">
            September 27th - 29th, 2024
          </div>
          <div className="text-[1.5rem] text-[#000000] xxs:text-[15px] xsm:text-[18px] md:text-[18px] lg:text-[23px] xlg:text-[20px] xxl:text-[40px]">
            Florida International University
          </div>
          <div className="text-[1.5rem] text-[#000000] xxs:text-[15px] xsm:text-[18px] md:text-[18px] lg:text-[23px] xlg:text-[20px] xxl:text-[40px]">
            Graham Center - Miami, FL
          </div>
          <div className="xxs:text-2xsl mt-1 flex justify-center gap-2 text-2xl text-ferra xxs:mt-3 xxs:gap-3 xxs:text-xl xsm:mt-5 xsm:gap-4 xsm:text-3xl sm:mt-4 lg:gap-3 lg:text-[3xl] xlg:gap-3 xlg:text-3xl xxl:gap-4 xxl:text-5xl">
            <Link
              href={"https://discord.com/invite/init"}
              target="_blank"
              className="cursor-pointer"
            >
              <FaDiscord />
            </Link>
            <Link
              href={"https://www.instagram.com/initofficial/"}
              target="_blank"
              className="cursor-pointer"
            >
              <AiFillInstagram />
            </Link>
            <Link
              href={"https://www.linkedin.com/company/initofficial/"}
              target="_blank"
              className="cursor-pointer"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <LandingButtons />
      {
        // i think the scroll for more gif is ugly. there is a way to do it with json lottie animations:
        // https://app.lottiefiles.com/animation/49b666a1-2cde-4881-971c-376b26b09ce9?channel=web&source=public-animation&panel=download
      }
      <div className="mt-7 flex justify-center">
        <div className="xlg:1xl relative bottom-3 h-11 w-11 xxl:text-2xl">
          <Image
            priority
            src="/assets/new/animation/scroll_for_more.gif"
            alt="scroll for more"
            fill
          />
        </div>
        <p className="xlg:text-1xl md:text-md font-museoregular xxs:text-[14px] xxl:text-2xl">
          scroll for more!
        </p>
      </div>
    </>
  );
};

export default LandingContent;
