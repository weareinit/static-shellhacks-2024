"use client";

import React from "react";
import MLHBanner from "../decorations/MLHBanner";
import SkyAndOcean from "./new_sections/SkyAndOcean";
import DinosAndNumbers from "./new_sections/DinosAndNumbers";
import AboutUs from "./new_sections/AboutUs";
import FAQs from "./new_sections/FAQs";
import Organizers from "./new_sections/Organizers";
import Sponsors from "./new_sections/Sponsors";

const Landing = () => {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <MLHBanner />
      <div id="landing" className="flex w-screen flex-col">
        <SkyAndOcean />
        <DinosAndNumbers />
      </div>
      <div id="about-us" className="flex w-screen flex-col">
        <AboutUs />
      </div>
      <div id="faqs">
        <FAQs />
      </div>
      <div id="organizers-and-sponsors">
        <Organizers />
        <Sponsors />
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
