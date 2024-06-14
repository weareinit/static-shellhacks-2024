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
      <Image
        priority
        src="/assets/new/background/forest/Dirt 2.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Dirt background"
        className="relative z-[-10] md:hidden"
      />
      <div className="absolute inset-0 top-[600px] flex w-full flex-col items-center justify-start text-center sm:top-[250px] md:top-[400px]">
        <h1 className="z-10 w-full font-zoonaji text-white sm:text-[40px] md:text-[50px] lg:text-[60px] xxl:text-[80px]">
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
            className="z-10 mt-[50px] sm:h-[400px] sm:w-[600px] md:h-[400px] md:w-[600px] lg:h-[500px] lg:w-[900px] xlg:h-[600px] xlg:w-[1100px] xxl:h-[800px] xxl:w-[1400px]"
          ></iframe>
        </div>
        <h1 className="z-[20] mb-[50px] mt-[100px] font-zoonaji text-[60px] text-white sm:text-[40px] md:text-[50px] lg:text-[60px] xxl:mt-[300px] xxl:text-[80px]">
          FAQs
        </h1>
        <FAQSlider />
        <DinoFossiles />
      </div>
    </div>
  );
};

export default FAQs;
