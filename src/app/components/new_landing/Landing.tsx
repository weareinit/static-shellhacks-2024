"use client";

import { useEffect, useState } from "react";
import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import LandingContent from "./LandingContent";
import PreviousNumbers from "./PreviousNumbers";
import BigDinos from "./BigDinos";
import Logo from "./Logo";
import Image from "next/image";

const Landing = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const img = document.createElement("img");
    img.onload = () => setImageHeight(img.height);
    img.src = "assets/new/background/beach/Beach.png";
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <MLHBanner />
      <div id="landing" className="flex w-screen flex-col">
        {/* Sky and Ocean > */}
        <div className="relative">
          <Image
            src="/assets/new/background/sky/Sky.png"
            layout="responsive"
            width={1789}
            height={697}
            alt="Sky background"
            className="relative z-[-10]"
          />
          <Image
            src="/assets/new/background/beach/Ocean.png"
            layout="responsive"
            width={1730}
            height={973}
            alt="Ocean background"
            className="relative z-[-10]"
          />

          {/* Content -> Absolute to the subsection, relative overall */}
          <div className="absolute inset-0">
            <Logo />
            <LandingContent />
          </div>
        </div>
        {/* Dinos and Numbers > */}
        <div className="relative">
          <Image
            src="/assets/new/background/beach/Beach.png"
            layout="responsive"
            width={1730}
            height={973}
            alt="Beach background"
            className="relative z-[-10]"
          />

          {/* Content -> Absolute to the subsection, relative overall */}
          <div className="absolute inset-0">
            <PreviousNumbers />
            <BigDinos />
          </div>
        </div>
      </div>
      <div id="about-us" className="flex w-screen flex-col">
        {/* Make divs to separate relative and absolute positioning within the page -- Don't insert content immediately below  */}
        <Image
          src="/assets/new/background/forest/Forest.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Forest background"
          className="relative z-[-10]"
        />
        <Image
          src="/assets/new/background/forest/Forest 2.png"
          layout="responsive"
          width={1730}
          height={974}
          alt="Grass background"
          className="relative z-[-10]"
        />
      </div>

      <div id="faqs">
        {/* Make divs to separate relative and absolute positioning within the page -- Don't insert content immediately below  */}
        <Image
          src="/assets/new/background/forest/Dirt 1.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Dirt background"
          className="relative z-[-10]"
        />
        <Image
          src="/assets/new/background/forest/Dirt 2.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Dirt background"
          className="relative z-[-10]"
        />
      </div>
      <div id="organizers-and-sponsors">
        {/* Make divs to separate relative and absolute positioning within the page -- Don't insert content immediately below  */}
        <Image
          src="/assets/new/background/lava/Lava1.gif"
          layout="responsive"
          width={1789}
          height={974}
          alt="Lava gif"
          className="relative z-[-10]"
        />
        {/* <Image
          src="/assets/new/background/lava/Lava1.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Lava background"
          className="relative z-[-10]"
        /> */}
        <Image
          src="/assets/new/background/lava/Lava2.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Lava background"
          className="relative  z-[-10]"
        />
        <Image
          src="/assets/new/background/lava/Stone.png"
          layout="responsive"
          width={1789}
          height={974}
          alt="Bedrock background"
          className="relative z-[-10]"
        />
      </div>

      {/* Bedrock */}
      <div className="max-w-screen h-[70px] bg-[url('/assets/new/background/lava/bedrock.png')] bg-contain bg-repeat"></div>
    </div>
  );
};

export default Landing;

{
  /* <div className="max-w-screen h-screen bg-[url('/assets/new/background/beach/Beach.svg')]"></div> */
  /* <div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/forest/Forest.svg')]"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/forest/Forest7.svg')]"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/forest/dirt.svg')]"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
        <div className="max-w-screen h-screen rotate-180 transform bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
      </div>
      <div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/lava/Lava6.gif')] bg-cover bg-no-repeat"></div>
        <div className="max-w-screen relative h-screen bg-[url('/assets/new/background/lava/Lava7.svg')] bg-cover"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/lava/stone.svg')] bg-cover"></div>
        <div className="max-w-screen h-screen rotate-180 transform bg-[url('/assets/new/background/lava/stone.svg')] bg-cover"></div>
        <div className="max-w-screen h-screen bg-[url('/assets/new/background/lava/stone.svg')] bg-cover"></div>
        <div className="max-w-screen h-[200px] bg-[url('/assets/new/background/lava/bedrock.png')] bg-no-repeat"></div>
      </div> */
}
