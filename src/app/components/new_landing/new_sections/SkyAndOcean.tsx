import React from "react";
import LandingContent from "../LandingContent";
import Image from "next/image";
import Logo from "../Logo";

const SkyAndOcean = () => {
  return (
    <div className="relative">
      <Image
        priority
        src="/assets/new/misc/Fish School.svg"
        width={100}
        height={115}
        alt="Fish"
        className="animate-fish-slide xxl:w-[150px] xxl:h-[180px] absolute left-[10%] top-[43%] z-[-5]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Cloud 2.svg"
        width={400}
        height={500}
        alt="Fish"
        className="animate-right-cloud-slide xxl:w-[700px] xxl:h-[550px] absolute left-[100vh] top-[10%] z-[-5]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Cloud 2.svg"
        width={400}
        height={500}
        alt="Fish"
        className="animate-cloud-slide xxl:w-[700px] xxl:h-[550px] absolute top-[15%] z-[-5]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Sky.png"
        layout="responsive"
        width={1789}
        height={697}
        alt="Sky background"
        className="relative z-[-10]"
      />
      <Image
        priority
        src="/assets/new/misc/Shell 2.svg"
        width={50}
        height={50}
        alt="Shell"
        className="xxl:h-[100px] absolute right-[10%] top-[60%] z-[-3] xl:w-[100px]"
      />
      <Image
        priority
        src="/assets/new/misc/Shell 1.svg"
        width={100}
        height={50}
        alt="Shell"
        className="xxl:w-[140px] xxl:h-[70px] absolute left-[10%] top-[80%] z-[-3]"
      />
      <Image
        priority
        src="/assets/new/dinosaurs/Pterodactyl.svg"
        width={300}
        height={200}
        alt="Pterodactyl"
        className="animate-slide-diagonal xxl:w-[400px] xxl:h-[300px] absolute right-0 z-[3]"
      />
      <Image
        priority
        src="/assets/new/background/beach/Ocean.png"
        layout="responsive"
        width={1730}
        height={973}
        alt="Ocean background"
        className="relative z-[-10] "
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
