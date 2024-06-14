import Image from "next/image";
import React from "react";

const DinoFossiles = () => {
  return (
    <div className="absolute z-[-9] h-full w-full">
      <Image
        priority
        src="/assets/new/misc/Plesiosaurus Skull.svg"
        width={358.76}
        height={193.7}
        alt="Plesiosaurus Skulls"
        className="absolute bottom-0 left-0 -z-[9]"
      />
      <Image
        priority
        src="/assets/new/misc/Pterodactyl Skull.svg"
        width={358.76}
        height={193.7}
        alt="Pterodactyl Skulls"
        className="absolute right-0 top-3/4 -z-[9]"
      />
      <Image
        priority
        src="/assets/new/misc/Fossil Shell.svg"
        width={120.03}
        height={120.03}
        alt="Fossil Shell"
        className="absolute left-0 top-0 -z-[9] sm:left-4 sm:h-[80px] sm:w-[80px]"
      />
    </div>
  );
};

export default DinoFossiles;
