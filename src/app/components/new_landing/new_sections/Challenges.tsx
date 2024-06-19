import React from "react";
import Link from "next/link";

const Challenges = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="font-zoonaji text-[60px] text-white xxs:text-[25px] xsm:text-[40px] sm:text-[40px] md:text-[50px] lg:text-[60px] xlg:text-[60px] xxl:text-[80px]">
        Challenges
      </div>
      <h3 className="font-museo text-white xxs:text-[13px] xsm:text-[15px] md:text-[20px] lg:text-[23px] xlg:text-[25px] xxl:text-[30px]">
        To be revealed in the Hackathon.
      </h3>
      <Link
        href="https://shellhacks-2023.devpost.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 xxl:mt-12"
      >
        <button
          className="m-0 flex transform cursor-pointer items-center justify-center rounded-[1.5rem] 
          bg-reddish_grey pb-2 pt-4 text-center font-zoonaji text-2xl text-stone-50 no-underline transition-all duration-200
           ease-in-out hover:scale-105 xxs:h-[3rem] xxs:w-[16rem] xxs:rounded-[20px] xxs:text-[16px] xsm:h-[4rem] xsm:w-[18rem] xsm:rounded-[25px] xsm:text-[18px] sm:w-[18rem] md:h-[3rem] md:w-[20rem] lg:h-[4rem] lg:w-[24rem] lg:text-2xl
           xlg:w-[30rem] xlg:text-2xl xxl:h-[7rem] xxl:w-[50rem] xxl:rounded-[3rem] xxl:text-5xl"
        >
          Check Out ShellHacks 2023
        </button>
      </Link>
    </div>
  );
};

export default Challenges;
