import React from "react";
import Image from "next/image";
// import { useEffect, useState } from 'react';

const Sponsors = () => {
  // const [numImages, setNumImages] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const viewportWidth = window.innerWidth;
  //     const imageWidth = 1789; // The width of your image
  //     const numImages = Math.ceil(viewportWidth / imageWidth);
  //     setNumImages(numImages);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize(); // Call the function initially to set the state

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="relative">
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      {/* {Array.from({ length: numImages }, (_, i) => (
        <Image
          key={i}
          src="/assets/new/background/lava/Stone.png"
          width={1789}
          height={974}
          alt="Bedrock background"
          className="relative z-[-10]"
        />
      ))} */}
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] md:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] sm:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <div className="absolute inset-0 flex flex-col items-center justify-start">
        <h1
          id="sponsors"
          className="xss:my-0 mt-4  font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Sponsored By
        </h1>

        <div className="grid auto-rows-auto grid-cols-2 gap-4 xxs:mt-8 sm:mt-0 sm:grid-cols-3">
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="microsoft" src="/assets/sponsors/microsoft.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="netflix" src="/assets/sponsors/Netflix 2015 logo.svg" className="object-cover pt-3"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="waymo" src="/assets/sponsors/Waymo.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="vanguard" src="/assets/sponsors/Vanguard.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="google" src="/assets/sponsors/Google.svg" className="object-cover"></Image>
          </div>
        </div>
        <p className="m-5 font-museo text-2xl text-white xxs:mt-7 xxs:text-[13px] xsm:text-[15px] sm:text-[15px] md:text-[20px] lg:mt-16 lg:text-[25px] xxl:text-[30px]">
          More sponsors to be revealed soon...
        </p>
        <h1
          id="sponsors"
          className="xss:my-0 mt-32  font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Community Partners
        </h1>

        <div className="grid auto-rows-auto grid-cols-2 gap-4 xxs:mt-8 sm:mt-0 sm:grid-cols-3">
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="microsoft" src="/assets/sponsors/INIT.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="netflix" src="/assets/sponsors/Venture_Miami.svg" className="object-cover pt-3"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="waymo" src="/assets/sponsors/MLH.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="vanguard" src="/assets/sponsors/FIU_KFSCIS.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="google" src="/assets/sponsors/Lab22c.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="google" src="/assets/sponsors/FIU_CEC.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="google" src="/assets/sponsors/KnightHacks.svg" className="object-cover"></Image>
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={500} height={200} alt="google" src="/assets/sponsors/Hackabull.svg" className="object-cover"></Image>
          </div>
        </div>

        <h1 className="xss:my-0 font-zoonaji text-[60px] text-pastel_orange xxs:mt-36 xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-5 lg:mt-96 lg:text-[60px] xxl:mb-5 xxl:mt-[100px] xxl:text-[80px]">
          Want to sponsor us?
        </h1>
        <p className=" font-museo text-2xl text-white xxs:text-[13px] xsm:text-[15px] sm:text-[15px] md:text-[20px]  lg:text-[25px] xxl:text-[30px]">
          Join the roar and reach out to{" "}
          <a className="underline" href="mailto:init@fiu.edu" target="_blank" rel="noopener noreferrer">
            init@fiu.edu
          </a>
          !
        </p>
      </div>
    </div>
  );
};

export default Sponsors;
