import Image from "next/image";
import React from "react";

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
        className="relative  z-[-10]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-start">
        <div id="empty_space" className="p-20"></div>
        <h1 className="mb-6 mt-4 font-zoonaji text-6xl text-[60px] text-pastel_orange">
          Organized By
        </h1>
        <Image
          priority
          src="/assets/sponsors/INIT_FIU.svg"
          width={617}
          height={136}
          alt="INIT FIU"
        ></Image>
      </div>
    </div>
  );
};

export default Organizers;
