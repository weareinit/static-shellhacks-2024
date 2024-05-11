"use client";

import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import LandingContent from "./LandingContent";
import Logo from "./Logo";

const Landing = () => {
  return (
    <div className="h-screen w-screen">
      <MLHBanner />
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/sky/Sky.svg')]">
        <Logo />
        <LandingContent />
      </div>
      {/* <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/sky/Sky.svg')]"></div> */}
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/beach/Ocean.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/beach/Beach.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/forest/Forest.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/forest/Forest7.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/forest/dirt.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
      <div className="-z-10 h-screen w-screen rotate-180 transform bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/forest/dirty.svg')]"></div>
      <div className="bg- -z-10 h-screen w-screen bg-[url('/assets/new/background/lava/Lava6.gif')] bg-no-repeat bg-cover"></div>
      <div className="relative -z-10 h-screen w-screen bg-[url('/assets/new/background/lava/Lava7.svg')] bg-cover"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/lava/stone.svg')] bg-cover"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/lava/stone.svg')] bg-cover transform rotate-180"></div>
      <div className="-z-10 h-screen w-screen bg-[url('/assets/new/background/lava/stone.svg')] bg-cover"></div>
      <div className="-z-10 h-[200px] w-screen bg-[url('/assets/new/background/lava/bedrock.png')] bg-no-repeat"></div>
    </div>
  );
};

export default Landing;
