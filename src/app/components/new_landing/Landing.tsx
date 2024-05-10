"use client";

import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import LandingContent from "./LandingContent";
import Logo from "./Logo";

const Landing = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#89ced8] to-[#aad8dc]">
      <MLHBanner />
      <Logo />
      <LandingContent />
    </div>
  );
};

export default Landing;
