import React from "react";
import Image from "next/image";
import FAQSlider from "./FAQSlider";
import DinoFossiles from "./DinoFossiles";
const FAQs = () => {
  return (
    <div className="relative">
      <Image
        priority
        src="/assets/new/background/forest/Dirt 1.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/background/forest/Dirt 2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/background/forest/Dirt 2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/background/forest/Dirt 2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10]"
      />
      {/* <Image priority
        src="/assets/new/background/forest/Dirt 2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10]"
      /> */}
      <div className="absolute inset-0 top-[600px] flex w-full flex-col items-center justify-start text-center">
        <h1 className="z-10 w-full font-zoonaji text-[60px] text-white">
          The ShellHacks Experience
        </h1>
        <div className="h-[630px]">
          <iframe
            width="1096"
            height="630"
            src="https://www.youtube.com/embed/9md34xFuPus?si=Hv6hsfKjHlejB0IL"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="z-10 mt-[50px]"
          ></iframe>
        </div>
        <h1 className="z-[20] mb-[50px] mt-[100px] font-zoonaji text-[60px] text-white">
          FAQs
        </h1>
        <FAQSlider />
        <DinoFossiles />
      </div>
    </div>
  );
};

export default FAQs;
