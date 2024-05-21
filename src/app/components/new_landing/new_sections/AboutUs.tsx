import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="relative">
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
      <div className="absolute inset-0"></div>
    </div>
  );
};

export default AboutUs;
