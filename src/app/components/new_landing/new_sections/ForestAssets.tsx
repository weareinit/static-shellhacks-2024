import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

const ForestAssets = () => {
  return (
    <div className="absolute inset-0 z-[-8] h-full w-full">
      <Image
        priority
        src={getAssetPath("assets/new/dinosaurs/Florida-Sand-Skink.svg")}
        height={150}
        width={150}
        alt="snake"
        className="relative left-[50%] top-[-200px] z-[-2] xxs:top-[-100px] xxs:h-[60px] xxs:w-[60px]"
      ></Image>
      <Image
        priority
        src={getAssetPath("assets/new/plants/Tree-1.svg")}
        height={600}
        width={700}
        alt="tree"
        className=" relative left-[-40px] top-[-200px] z-[-2] xxs:left-[-100px] xxs:top-[-100px] xxs:h-[400px] xxs:w-[470px] sm:left-[-130px] sm:top-[-150px] sm:h-[600px] md:h-[600px] md:w-[700px] xxl:left-[50px] xxl:top-[-500px] xxl:h-[120rem]  xxl:w-[60rem]"
      ></Image>
      <Image
        priority
        src={getAssetPath("assets/new/misc/Rock-3.svg")}
        height={100}
        width={100}
        alt="rock"
        className="absolute left-[25%] top-[5%]  z-[-2] xxs:h-[50px]  xxs:w-[50px] xxl:top-0 xxl:h-[12rem] xxl:w-[12rem]"
      ></Image>
      <Image priority src={getAssetPath("assets/new/plants/Shrub-3.svg")} height={125} width={125} alt="Shrub" className="absolute right-[5%]  top-[5%] z-[-2] xxs:h-[75px] xxs:w-[75px]"></Image>
      <Image
        priority
        src={getAssetPath("assets/new/plants/Shrub-1.svg")}
        height={250}
        width={250}
        alt="Shrub"
        className="absolute bottom-[24%] left-[5%]  z-[-2] xxs:h-[150px] xxs:w-[150px] sm:left-[5%] sm:h-[175px] sm:w-[175px]"
      ></Image>
      <Image
        priority
        src={getAssetPath("assets/new/plants/Shrub-4.svg")}
        height={120}
        width={120}
        alt="Shrub"
        className="absolute bottom-[35%] right-[10%]  z-[-2] xxs:h-[75px] xxs:w-[75px] sm:right-[4%] sm:h-[80px] sm:w-[80px]"
      ></Image>
      <Image
        priority
        src={getAssetPath("assets/new/dinosaurs/Flamingo.svg")}
        height={400}
        width={300}
        alt="Flamingo"
        className="absolute z-[-2] scale-x-[-1] transform xxs:bottom-[12%] xxs:right-[-20px] xxs:h-[120px] xxs:w-[120px] xsm:right-[-40px] xsm:h-[200px] xsm:w-[200px] sm:bottom-[12%] sm:h-[200px] sm:w-[150px] md:bottom-[18%] md:right-[10%] md:h-[400px] md:w-[300px]"
      ></Image>
      <div className="absolute z-[15] flex hidden h-full min-w-[100vw] justify-center xxs:top-[42%] sm:top-[38%] md:top-[40%] xlg:top-[32%] xxl:top-[32%]">
        <Image priority src={getAssetPath("assets/new/plants/Grasses.svg")} layout="fill" alt="Grasses" className=" z-[-2] scale-x-[-1] transform"></Image>
        <Image priority src={getAssetPath("assets/new/plants/Grasses.svg")} layout="fill" alt="Grasses" className="relative z-[10]"></Image>
      </div>
    </div>
  );
};

export default ForestAssets;
