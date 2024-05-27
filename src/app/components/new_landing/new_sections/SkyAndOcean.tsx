import React from "react";
import LandingContent from "../LandingContent";
import Image from "next/image";
import Logo from "../Logo";

const SkyAndOcean = () => {
  return (
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
  );
};

export default SkyAndOcean;
