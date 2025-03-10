import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

const Sponsors = () => {
  return (
    <div className="relative">
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="3xl:hidden relative z-[-10]" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] sm:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] hidden min-[410px]:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] lg:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] hidden min-[410px]:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] min-[410px]:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image
        src={getAssetPath("assets/new/background/lava/Stone.png")}
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] hidden xsm:block sm:hidden"
      />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] xsm:hidden" />
      <Image
        src={getAssetPath("assets/new/background/lava/Stone.png")}
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] hidden xsm:block lg:hidden"
      />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10]" />
      <Image src={getAssetPath("assets/new/background/lava/Stone.png")} layout="responsive" width={1789} height={974} alt="Bedrock background" className="relative z-[-10] hidden min-[1100px]:block" />
      <Image
        src={getAssetPath("assets/new/background/lava/Stone.png")}
        layout="responsive"
        width={1789}
        height={974}
        alt="Bedrock background"
        className="relative z-[-10] hidden lg:block min-[1440px]:hidden"
      />

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
        <div className="mx-10 mb-10 grid w-3/5 auto-rows-auto place-items-center xsm:w-5/6 xsm:grid-cols-2 sm:mb-12 sm:w-4/5">
          <TIER_TWO_SPONSORS />
        </div>
        <div className="mx-10 grid auto-rows-auto grid-cols-2 place-items-center gap-4 xxs:mt-8 xsm:grid-cols-3 sm:mt-0">
          <TIER_THREE_SPONSORS />
        </div>
        <h1
          id="sponsors"
          className="xss:my-0 mt-32 font-zoonaji text-[60px] text-pastel_orange xxs:text-[25px] xsm:text-[30px] sm:mb-1 sm:text-[40px] md:text-[50px] lg:mb-6 lg:text-[60px] xxl:mb-12 xxl:mt-[100px] xxl:text-[80px]"
        >
          Community Partners
        </h1>

        <div className="mx-10 grid auto-rows-auto grid-cols-2 place-items-center gap-8 xxs:mt-8 sm:mt-0 sm:grid-cols-3 min-[900px]:mb-[50px]">
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init_MDC" src={getAssetPath("assets/sponsors/INIT_MDC.svg")} className="object-contain pt-2" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init" src={getAssetPath("assets/sponsors/INIT.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="init_PRO" src={getAssetPath("assets/sponsors/INIT_PRO.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="venture_miami" src={getAssetPath("assets/sponsors/Venture_Miami.svg")} className="object-contain pt-3" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="waymo" src={getAssetPath("assets/sponsors/MLH.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="vanguard" src={getAssetPath("assets/sponsors/FIU_KFSCIS.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="lab22c" src={getAssetPath("assets/sponsors/Lab22c.svg")} className="object-contain" />
          </div>
          <div className="col-span-1 scale-[0.6]">
            <Image width={350} height={200} alt="WiCS" src={getAssetPath("assets/sponsors/WiCS.svg")} />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="FIU_CEC" src={getAssetPath("assets/sponsors/FIU_CEC.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="knighthacks" src={getAssetPath("assets/sponsors/KnightHacks.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1 xsm:scale-[1.2]">
            <Image width={350} height={200} alt="hackabull" src={getAssetPath("assets/sponsors/Hackabull.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="FIU ELT" src={getAssetPath("assets/sponsors/FIU_ELT.svg")} className="object-contain" />
          </div>
          <div className="aspect-content aspect-w-1 aspect-h-1">
            <Image width={350} height={200} alt="Knight Foundation" src={getAssetPath("assets/sponsors/KF.svg")} className="object-contain" />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:-mt-[20px] min-[1100px]:scale-[1.6]">
            <Image width={80} height={150} alt="Magic Miami" src={getAssetPath("assets/sponsors/Magic_Miami.png")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:-mt-[20px] min-[1100px]:scale-[1.6]">
            <Image width={80} height={150} alt="NSBE" src={getAssetPath("assets/sponsors/NSBE.svg")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:my-[30px] min-[1100px]:-mt-[10px] min-[1100px]:scale-[1.6]">
            <Image width={50} height={100} alt="FIU ECO Engineering" src={getAssetPath("assets/sponsors/FIU_Eco_Engineering.svg")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:scale-[1.6]">
            <Image width={50} height={100} alt="Open Source" src={getAssetPath("assets/sponsors/Open_Source.svg")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:scale-[1.6]">
            <Image width={50} height={100} alt="AIS" src={getAssetPath("assets/sponsors/AIS.svg")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:scale-[1.6]">
            <Image width={50} height={100} alt="SEDS" src={getAssetPath("assets/sponsors/SEDS.svg")} />
          </div>
          <div className="col-span-1 xsm:scale-[1.3] min-[1100px]:scale-[1.6]">
            <Image width={50} height={100} alt="DSI" src={getAssetPath("assets/sponsors/DSI.svg")} />
          </div>
          <div className="col-span-1 hidden xsm:scale-[1.3] sm:block min-[1100px]:mt-6 min-[1100px]:scale-[1.6]">
            <Image width={100} height={100} alt="WiCYs" src={getAssetPath("assets/sponsors/WiCYs.png")} />
          </div>
          <div className="relative xsm:scale-[1.2] sm:left-[9rem] sm:my-auto md:left-[11rem] lg:left-[13rem] min-[1100px]:mt-6">
            <Image width={250} height={150} alt="SwampHacks" src={getAssetPath("assets/sponsors/SwampHacks.svg")} />
          </div>
          <div className="relative  xsm:scale-[1.3] sm:left-[9rem] sm:my-auto md:left-[11rem] lg:left-[13rem] min-[1100px]:mt-6">
            <Image width={100} height={150} alt="Miami Tech Works" src={getAssetPath("assets/sponsors/Miami_Tech_Works.svg")} />
          </div>
          <div className="col-span-2 xsm:scale-[1.3] sm:hidden min-[1100px]:mt-6 min-[1100px]:scale-[1.6]">
            <Image width={100} height={100} alt="WiCYs" src={getAssetPath("assets/sponsors/WiCYs.png")} />
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
  className?: string;
  // for Next.js Image Component
  width?: number;
  height?: number;
  last?: boolean;
};

const TITLE_SPONSOR = () => {
  const SPONSOR: SponsorType = {
    name: "Microsoft",
    image: getAssetPath("assets/sponsors/microsoft.svg"),
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
      image: getAssetPath("assets/sponsors/Assurant.svg"),
    },
    {
      name: "Netflix",
      image: getAssetPath("assets/sponsors/Netflix.png"),
      className: "-mb-12 -mt-10 scale-75 xsm:scale-90 xsm:-mb-8",
    },
    {
      name: "Vanguard",
      image: getAssetPath("assets/sponsors/Vanguard.svg"),
      className: "mt-2",
      width: 400,
      height: 300,
    },
    {
      name: "BNY Mellon",
      image: getAssetPath("assets/sponsors/BNY_Mellon.svg"),
      className: "my-2 xsm:my-4 xsm:scale-100 sm:scale-125 md:scale-125 lg:scale-[1.75]",
      width: 115,
      height: 150,
    },
    {
      name: "Ford",
      image: getAssetPath("assets/sponsors/Ford.svg"),
      className: "mt-2",
      last: true,
    },
  ];

  const isLastElement = "place-self-center xsm:col-span-2 xsm:w-3/5";

  return SPONSORS.map((sponsor) => (
    <div key={sponsor.name} className={`${sponsor.className} ${sponsor.last ? isLastElement : ""}`}>
      <Image width={sponsor.width ?? 500} height={sponsor.height ?? 200} alt={sponsor.name} src={sponsor.image} className="m-auto text-center" />
    </div>
  ));
};

const TIER_THREE_SPONSORS = () => {
  const SPONSORS = [
    {
      name: "Waymo",
      image: getAssetPath("assets/sponsors/Waymo.svg"),
      className: "scale-105",
    },
    {
      name: "Google",
      image: getAssetPath("assets/sponsors/Google.svg"),
      className: "md:scale-105",
    },
    {
      name: "Chevron",
      image: getAssetPath("assets/sponsors/Chevron.svg"),
      className: "scale-110",
    },
    {
      name: "Patient Safety Technology Challenge",
      image: getAssetPath("assets/sponsors/PSTC.png"),
      width: 100,
      height: 150,
      className: "lg:scale-150",
    },
    {
      name: "Nvidia",
      image: getAssetPath("assets/sponsors/NVIDIA.svg"),
    },
    {
      name: "CodePath",
      image: getAssetPath("assets/sponsors/CodePath.svg"),
    },
    {
      name: "Southwest Airlines",
      image: getAssetPath("assets/sponsors/Southwest.svg"),
    },
    {
      name: "State Farm",
      image: getAssetPath("assets/sponsors/State_Farm.svg"),
      className: "sm:scale-95",
    },
    {
      name: "Capital One",
      image: getAssetPath("assets/sponsors/Capital_One.svg"),
      className: "sm:scale-125",
    },
    {
      name: "Breakthrough Tech",
      image: getAssetPath("assets/sponsors/Breakthrough_Tech.svg"),
      className: "scale-110 sm:scale-125",
    },
    {
      name: "MDC_IT",
      image: getAssetPath("assets/sponsors/MDC_IT.svg"),
      width: 60,
      className: "scale-[0.5] xsm:scale-75 sm:scale-90 md:scale-100 lg:scale-125 lg:mb-2",
    },
    {
      name: "North Star Catering",
      image: getAssetPath("assets/sponsors/North_Star_Catering.svg"),
      width: 100,
      height: 100,
      className: "md:scale-150 sm:scale-125 lg:scale-[2.0]",
    },
    {
      name: "Snap",
      image: getAssetPath("assets/sponsors/Snap.svg"),
      width: 45,
      height: 100,
      className: "md:scale-150 sm:scale-[1.5] xsm:scale-[1.2] lg:scale-[1.75]",
    },
    {
      name: "GitHub",
      image: getAssetPath("assets/sponsors/GitHub.svg"),
      className: "lg:mt-2",
    },
    {
      name: "Cafe Cultura",
      image: getAssetPath("assets/sponsors/Cafe_Cultura.svg"),
      className: "scale-[0.6]",
    },
    {
      name: "Geeks for Geeks",
      image: getAssetPath("assets/sponsors/GeeksForGeeks.png"),
      className: "scale-[0.3] -my-8",
    },
    {
      name: "Chainguard",
      image: getAssetPath("assets/sponsors/Chainguard.png"),
      className: "relative -mb-6 -mt-6 scale-[0.7]",
    },
    {
      name: "ETH Miami",
      image: getAssetPath("assets/sponsors/ETH_Miami.svg"),
      width: 100,
      height: 100,
      className: "md:scale-150 sm:scale-150 lg:scale-[2.2]",
    },
  ];

  const isLastElement = "place-self-center col-span-2 xsm:col-auto xsm:w-5/6 w-1/2 sm:w-full lg:w-3/5";

  return SPONSORS.map((sponsor) => (
    <div key={sponsor.name} className={`${sponsor.className} ${sponsor?.last ? isLastElement : ""}`}>
      <Image width={sponsor.width ?? 400} height={sponsor.height ?? 150} alt={sponsor.name} src={sponsor.image} className="m-auto text-center" />
    </div>
  ));
};

export default Sponsors;
