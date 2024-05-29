import React from "react";
import Image from "next/image";
const ForestAssets = () => {
  return (
    <div className="absolute inset-0 z-[-8] h-full w-full">
      <Image
        priority
        src="/assets/new/dinosaurs/Florida Sand Skink.svg"
        height={150}
        width={150}
        alt="snake"
        className="relative left-[50%] top-[-200px] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/plants/Tree 1.svg"
        height={600}
        width={700}
        alt="tree"
        className="relative left-[-40px] top-[-200px] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/misc/Rock 3.svg"
        height={100}
        width={100}
        alt="rock"
        className="absolute left-[25%] top-[5%] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/plants/Shrub 3.svg"
        height={125}
        width={125}
        alt="Shrub"
        className="absolute right-[5%] top-[5%] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/plants/Shrub 1.svg"
        height={250}
        width={250}
        alt="Shrub"
        className="absolute bottom-[24%] left-[5%] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/plants/Shrub 4.svg"
        height={120}
        width={120}
        alt="Shrub"
        className="absolute bottom-[35%] right-[10%] z-[-2]"
      ></Image>
      <Image
        priority
        src="/assets/new/dinosaurs/Flamingo.svg"
        height={400}
        width={300}
        alt="Flamingo"
        className="absolute bottom-[18%] right-[10%] z-[-2] scale-x-[-1] transform"
      ></Image>
      <div className="absolute top-[32%] z-[15] flex h-full min-w-[100vw] justify-center">
        <Image
          priority
          src="/assets/new/plants/Grasses.svg"
          layout="fill"
          alt="Grasses"
          className=" z-[-2] scale-x-[-1] transform"
        ></Image>
        <Image
          priority
          src="/assets/new/plants/Grasses.svg"
          layout="fill"
          alt="Shrub"
          className="z-[10]"
        ></Image>
      </div>
    </div>
  );
};

export default ForestAssets;
