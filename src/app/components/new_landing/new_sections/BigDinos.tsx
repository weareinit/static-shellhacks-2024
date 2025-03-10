import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

const BigDinos = () => {
  // TODO: Add responsiveness to palm trees (Dinos already are responsive)
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0 flex flex-row items-baseline justify-between">
        <div>
          <Image
            priority
            src={getAssetPath("assets/new/plants/Tree 2.svg")}
            width={750}
            height={750}
            alt="Tree"
            className="absolute bottom-0 left-[-250px] z-[-3] xxs:hidden sm:bottom-[2px] sm:left-[-150px] sm:block sm:w-[450px] md:left-[-150px] md:w-[500px] xxl:h-[90rem] xxl:w-[60rem]"
          />
          <Image
            priority
            src={getAssetPath("assets/new/dinosaurs/Brachiosaurus.svg")}
            width={1063}
            height={1143}
            alt="Dinosaur"
            className="relative bottom-[10px] left-[-40px] z-[-2] xxs:hidden sm:block"
          />
          {/*small */}
          <Image
            priority
            src={getAssetPath("assets/new/plants/Tree 2.svg")}
            width={500}
            height={500}
            alt="Tree"
            className="absolute z-[-3] xxs:bottom-0 xxs:left-[-150px] xxs:block xxs:h-[300px] xsm:bottom-0 xsm:left-[-250px] xsm:h-[500px] sm:hidden"
          />
          <Image
            priority
            src={getAssetPath("assets/new/dinosaurs/Brachiosaurus.svg")}
            width={600}
            height={660}
            alt="Dinosaur"
            className="absolute xxs:bottom-[-20px] xxs:left-[-100px] xxs:block xxs:h-[300px] xsm:bottom-[-30px] xsm:left-[-150px] xsm:z-[-2] xsm:h-[500px] sm:hidden"
          />
        </div>
        <div>
          <Image
            priority
            src={getAssetPath("assets/new/plants/Tree 2.svg")}
            width={600}
            height={600}
            alt="Tree"
            className="absolute bottom-[20px] right-[-150px] z-[-3] scale-x-[-1] transform xxs:hidden sm:bottom-[50px] sm:right-[-100px] sm:block sm:w-[400px] md:right-[-100px] md:w-[450px] xxl:h-[75rem] xxl:w-[50rem]"
          />
          <Image priority src={getAssetPath("assets/new/dinosaurs/Trex_1.svg")} width={723} height={844} alt="Dinosaur" className="relative bottom-[20px] z-[-2] xxs:hidden sm:block" />
          {/* small */}
          <Image
            priority
            src={getAssetPath("assets/new/plants/Tree 2.svg")}
            width={300}
            height={300}
            alt="Tree"
            className="absolute z-[-3] scale-x-[-1] transform xxs:bottom-[50px] xxs:right-[-100px] xxs:block xxs:h-[250px] xsm:bottom-[-50px] xsm:right-[-100px] xsm:h-[600px] sm:bottom-[70px] sm:right-[-80px] sm:hidden"
          />
          <Image
            priority
            src={getAssetPath("assets/new/dinosaurs/Trex_1.svg")}
            width={450}
            height={490}
            alt="Dinosaur"
            className="absolute z-[-2] xxs:bottom-[0px] xxs:right-[-150px] xxs:block xxs:h-[250px] xsm:bottom-[0px] xsm:right-[-160px] xsm:h-[400px] sm:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default BigDinos;
