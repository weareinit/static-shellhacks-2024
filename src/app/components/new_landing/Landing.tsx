"use client";

import React, { useState } from "react";
import MLHBanner from "../decorations/MLHBanner";
import SkyAndOcean from "./new_sections/SkyAndOcean";
import DinosAndNumbers from "./new_sections/DinosAndNumbers";
import ForestBackground from "./new_sections/ForestBackground";
import FAQs from "./new_sections/FAQs";
import Organizers from "./new_sections/Organizers";
import Sponsors from "./new_sections/Sponsors";
import NavBar from "./new_sections/NavBar";
import SideBar from "./new_sections/SideBar";
import { getAssetPath } from "@/app/util/getAssetPath";

const Landing = () => {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <MLHBanner />
      <NavBar />
      <SideBar />
      <div id="landing" className="flex w-screen flex-col">
        <SkyAndOcean />
        <DinosAndNumbers />
      </div>
      <div id="about-us" className="flex w-screen flex-col">
        <ForestBackground />
      </div>
      <div id="faqs">
        <FAQs />
      </div>
      <div id="organizers-and-sponsors">
        <Organizers />
        <Sponsors />
      </div>

      {/* Bedrock */}
      <div className="max-w-screen h-[70px]" style={{ backgroundImage: `url(${getAssetPath("assets/new/background/lava/bedrock.png")})`, backgroundSize: "contain", backgroundRepeat: "repeat" }}></div>
    </div>
  );
};

export default Landing;
