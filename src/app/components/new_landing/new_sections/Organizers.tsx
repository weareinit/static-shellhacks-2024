import Image from "next/image";
import React from "react";
import SkullLavaSection from "./SkullsSection";

const Organizers = () => {
  return (
    <div className="relative">
      {/* <Image priority
        src="/assets/new/background/lava/Lava1.gif"
        layout="responsive"
        width={1789}
        height={974}
        alt="Lava gif"
        className="relative z-[-10]"
      /> */}
      <Image
        priority
        src="/assets/new/background/lava/Lava1.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Lava background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/background/lava/Lava2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Lava background"
        className="relative z-[-10]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-start md:top-[-40px]">
        <div id="empty_space" className="sm:p-10 md:p-20"></div>
        <h1 className="mb-6 mt-4 font-zoonaji text-[60px] text-pastel_orange sm:text-[40px] md:text-[50px] lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]">
          Organized By
        </h1>
        <Image
          priority
          src="/assets/sponsors/INIT_FIU.svg"
          width={617}
          height={136}
          alt="INIT FIU"
          className="sm:h-[60px] sm:w-[450px] md:h-[70px] md:w-[400px]"
        />
        <SkullLavaSection />
      </div>
    </div>
  );
};

export default Organizers;
