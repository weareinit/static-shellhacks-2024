"use client";

import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import LandingContent from "./LandingContent";
import Logo from "./Logo";
import Image from "next/image";

const Landing = () => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 -z-20 h-screen w-screen">
        <Image
          src="/assets/new/background/beach/Ocean 1.png"
          alt="beach"
          fill
        />
      </div>
      <div className="absolute top-[43.5%] -z-10 h-screen w-screen">
        <Image
          src="/assets/new/background/beach/Ocean 7.png"
          alt="beach"
          fill
        />
      </div>
      <MLHBanner />
      <Logo />
      <LandingContent />
    </div>
  );
};

export default Landing;
