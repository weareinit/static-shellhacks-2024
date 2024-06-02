import React from "react";
import Image from "next/image";

const BigDinos = () => {
  // TODO: Add responsiveness to palm trees (Dinos already are responsive)
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0 flex flex-row items-baseline justify-between">
        <div>
          <Image
            priority
            src="assets/new/plants/Tree 2.svg"
            width={750}
            height={750}
            alt="Tree"
            className="xxl:w-[60rem] xxl:h-[90rem] absolute  bottom-0 left-[-250px] z-[-3]"
          />
          <Image
            priority
            src="/assets/new/dinosaurs/Brachiosaurus.svg"
            width={1063}
            height={1143}
            alt="Dinosaur"
            className="relative bottom-[10px] left-[-40px] z-[-2]"
          />
        </div>
        <div>
          <Image
            priority
            src="assets/new/plants/Tree 2.svg"
            width={600}
            height={600}
            alt="Tree"
            className="xxl:w-[50rem] xxl:h-[75rem] absolute bottom-[20px] right-[-150px] z-[-3] scale-x-[-1] transform"
          />
          <Image
            priority
            src="/assets/new/dinosaurs/Trex_1.svg"
            width={723}
            height={844}
            alt="Dinosaur"
            className="relative bottom-[20px] z-[-2]"
          />
        </div>
      </div>
    </div>
  );
};

export default BigDinos;
