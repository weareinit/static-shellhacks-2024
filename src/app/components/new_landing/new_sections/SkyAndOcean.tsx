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
        className="absolute left-[10%] top-[43%] z-[-5] animate-fish-slide sm:top-[63%] sm:h-[40px] sm:w-[30px] md:h-[115px] md:w-[100px] xxl:h-[180px] xxl:w-[150px]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Cloud 2.svg"
        width={400}
        height={500}
        alt="Cloud"
        className="absolute left-[100vh] top-[10%] z-[-5] animate-right-cloud-slide xxl:h-[550px] xxl:w-[700px]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Cloud 2.svg"
        width={400}
        height={500}
        alt="Cloud"
        className="absolute top-[15%] z-[-5] animate-cloud-slide xxl:h-[550px] xxl:w-[700px]"
      />
      <Image
        priority
        src="/assets/new/background/sky/Sky 0.png"
        layout="responsive"
        width={1789}
        height={697}
        alt="Sky background"
        className="relative z-[-10] md:hidden"
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
        className="absolute right-[10%] top-[60%] z-[-3] sm:top-[75%] xl:w-[100px] xxl:h-[100px]"
      />
      <Image
        priority
        src="/assets/new/misc/Shell 1.svg"
        width={100}
        height={50}
        alt="Shell"
        className="absolute left-[10%] top-[80%] z-[-3] sm:top-[90%] xxl:h-[70px] xxl:w-[140px]"
      />
      <Image
        priority
        src="/assets/new/dinosaurs/Pterodactyl.svg"
        width={300}
        height={200}
        alt="Pterodactyl"
        className="absolute right-0 z-[3] animate-slide-diagonal xxl:h-[300px] xxl:w-[400px]"
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
