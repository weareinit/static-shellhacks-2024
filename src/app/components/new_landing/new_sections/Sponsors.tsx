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
      <Image
        src="/assets/new/background/lava/Stone.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10]"
      />
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
      <Image
        src="/assets/new/background/lava/Stone.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10]"
      />
      <Image
        src="/assets/new/background/lava/Stone.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] md:hidden"
      />
      <Image
        src="/assets/new/background/lava/Stone.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] sm:hidden"
      />
      <Image
        src="/assets/new/background/lava/Stone.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] xsm:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-start">
        <h1
          id="sponsors"
          className="xss:my-0 mt-4  font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Sponsored By
        </h1>
        <p className="m-5 font-museo text-2xl text-white xxs:text-[13px] xsm:text-[15px] sm:text-[15px] md:text-[20px] lg:text-[25px] xxl:text-[30px]">
          Sponsors to be revealed soon...
        </p>
      </div>
    </div>
  );
};

export default Sponsors;
