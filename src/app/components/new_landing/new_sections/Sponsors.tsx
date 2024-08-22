import React from "react";
import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="relative">
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="3xl:hidden relative z-[-10]" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] sm:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] lg:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      <Image src="/assets/new/background/lava/Stone.png" layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] hidden lg:block xl:hidden" />

      <div className="absolute inset-0 flex flex-col items-center justify-start">
        <h1
          id="sponsors"
          className="xss:my-0 mt-4 font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Sponsored By
        </h1>
        <div className="mb-8">
          <div className="mx-auto w-[450px] p-2 xsm:w-3/4">
            <TITLE_SPONSOR />
          </div>
        </div>
        <div className="mx-10 mb-8 grid w-3/5 auto-rows-auto place-items-center xsm:w-5/6 xsm:grid-cols-2 sm:w-full">
          <TIER_TWO_SPONSORS />
        </div>
        <div className="mx-10 grid auto-rows-auto grid-cols-2 place-items-center gap-4 xxs:mt-8 xsm:grid-cols-3 sm:mt-0">
          <TIER_THREE_SPONSORS />
        </div>
        <p className="m-5 mb-8 font-museo text-2xl text-white xxs:mt-7 xxs:text-[13px] xsm:text-[15px] sm:text-[15px] md:text-[20px] lg:mt-16 lg:text-[25px] xxl:text-[30px]">
          More sponsors to be revealed soon...
        </p>
        <h1
          id="sponsors"
          className="xss:my-0 mt-32 font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Community Partners
        </h1>

        <div className="mx-10 grid auto-rows-auto grid-cols-2 place-items-center gap-8 xxs:mt-8 sm:mt-0 sm:grid-cols-3">
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init_MDC" src="/assets/sponsors/INIT_MDC.svg" className="object-contain pt-2" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init" src="/assets/sponsors/INIT.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init_PRO" src="/assets/sponsors/INIT_PRO.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="venture_miami" src="/assets/sponsors/Venture_Miami.svg" className="object-contain pt-3" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="waymo" src="/assets/sponsors/MLH.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="vanguard" src="/assets/sponsors/FIU_KFSCIS.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="lab22c" src="/assets/sponsors/Lab22c.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="FIU_CEC" src="/assets/sponsors/FIU_CEC.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="knighthacks" src="/assets/sponsors/KnightHacks.svg" className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="hackabull" src="/assets/sponsors/Hackabull.svg" className="object-contain" />
          </div>
        </div>

        <h1 className="mb-4 mt-10 font-zoonaji text-xl text-pastel_orange min-[350px]:text-xl xsm:text-2xl sm:text-3xl md:text-5xl lg:text-6xl">Want to sponsor us?</h1>
        <p className=" font-museo text-2xl text-white xxs:text-[13px] xsm:text-[15px] sm:text-[15px] md:text-[20px]  lg:text-[25px] xxl:text-[30px]">
          Join the roar and reach out to{" "}
          <a className="underline" href="mailto:init@fiu.edu" target="_blank" rel="noopener noreferrer">
            init@fiu.edu
          </a>
          !
        </p>
      </div>
    </div>
  );
};

type SponsorType = {
  name: string;
  image: string;
};

const TITLE_SPONSOR = () => {
  const SPONSOR: SponsorType = {
    name: "Microsoft",
    image: "/assets/sponsors/microsoft.svg",
  };

  return (
    <div>
      <Image width={800} height={300} alt={SPONSOR.name} src={SPONSOR.image} className="object-cover pt-3" />
    </div>
  );
};

// WARN: Only add sponsors as intended
const TIER_TWO_SPONSORS = () => {
  const SPONSORS: Array<SponsorType> = [
    {
      name: "Assurant",
      image: "/assets/sponsors/Assurant.svg",
    },
    {
      name: "Netflix",
      image: "/assets/sponsors/Netflix.png",
    },
    {
      name: "Vanguard",
      image: "/assets/sponsors/Vanguard.svg",
    },
    {
      name: "Ford",
      image: "/assets/sponsors/Ford.svg",
    },
  ];

  return SPONSORS.map((sponsor) => (
    <div>
      <Image width={500} height={200} alt={sponsor.name} src={sponsor.image} />
    </div>
  ));
};

const TIER_THREE_SPONSORS = () => {
  const SPONSORS = [
    {
      name: "Waymo",
      image: "/assets/sponsors/Waymo.svg",
    },
    {
      name: "Google",
      image: "/assets/sponsors/Google.svg",
    },
    {
      name: "Chevron",
      image: "/assets/sponsors/Chevron.svg",
    },
    {
      name: "Addigy",
      image: "/assets/sponsors/Addigy.svg",
    },
    {
      name: "Miami Dade County",
      image: "/assets/sponsors/MDC.svg",
    },
    {
      name: "Nvidia",
      image: "/assets/sponsors/NVIDIA.svg",
    },
    {
      name: "Break Through Tech",
      image: "/assets/sponsors/Breakthrough_Tech.svg",
    },
    {
      name: "CodePath",
      image: "/assets/sponsors/CodePath.svg",
    },
    {
      name: "Voyages",
      image: "/assets/sponsors/VV.png",
    },
    {
      name: "Southwest Airlines",
      image: "/assets/sponsors/Southwest.svg",
    },
    {
      name: "Capital One",
      image: "/assets/sponsors/Capital_One.svg",
    },
    {
      name: "State Farm",
      image: "/assets/sponsors/State_Farm.svg",
    },
    {
      name: "Patient Safe Technology Challenge",
      image: "/assets/sponsors/PSTC.png",
      width: 250,
      height: 150,
    },
  ];

  return SPONSORS.map((sponsor) => (
    <div>
      <Image width={sponsor.width ?? 400} height={sponsor.height ?? 150} alt={sponsor.name} src={sponsor.image} />
    </div>
  ));
};

export default Sponsors;
