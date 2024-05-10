"use client";

import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import LandingContent from "./LandingContent";
import Logo from "./Logo";

const Landing = () => {
  return (
    <div className="h-screen w-screen">
      <div className="absolute -top-[76.4%] -z-10 h-screen w-screen bg-[url('/assets/new/background/sky/Sky7.svg')]" />
      <div className="absolute top-[23.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/beach/Ocean8.svg')]" />
      <div className="absolute top-[78.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/beach/Ocean.svg')]" />
      <div className="absolute top-[178.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/beach/Beach.svg')]" />
      <div className="absolute top-[278.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/forest/Forest.svg')]" />
      <div className="absolute top-[378.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/forest/Forest7.svg')]" />
      <div className="absolute top-[478.5%] -z-10 h-screen w-screen bg-[url('/assets/new/background/forest/dirt.svg')]" />
      <MLHBanner />
      <Logo />
      <LandingContent />
    </div>
  );
};

export default Landing;
