"use client";

import Image from "next/image";
import React from "react";
import MLHBanner from "../decorations/MLHBanner";

const Landing = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#89ced8] to-[#aad8dc]">
      <MLHBanner />
    </div>
  );
};

export default Landing;
