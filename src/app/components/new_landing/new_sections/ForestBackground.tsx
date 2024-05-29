import React from "react";
import Image from "next/image";
import Carousel from "./Carousel";
import Challenges from "./Challenges";
import ForestAssets from "./ForestAssets";
const AboutUs = () => {
  return (
    <div className="relative w-full">
      <Image
        priority
        src="/assets/new/background/forest/Forest.png"
        layout="responsive"
        width={1789}
        height={974}
        alt="Forest background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/background/forest/Forest 2.png"
        layout="responsive"
        width={1730}
        height={974}
        alt="Grass background"
        className="relative z-[-10]"
      />
      <div className="absolute inset-0 z-10 mt-[30%] h-full w-full">
        <ForestAssets />
        <Carousel />
        <div className="my-20"></div>
        <Challenges />
      </div>
    </div>
  );
};

export default AboutUs;
