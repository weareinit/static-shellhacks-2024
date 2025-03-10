import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

const Logo = () => {
  return (
    <div className="mt-12 flex justify-center">
      <div className="relative xxs:mt-10 xxs:h-[8rem] xxs:w-2/3 xsm:h-[10rem] xsm:w-3/4 sm:mt-[10rem] sm:h-[10rem] sm:w-1/2 md:mt-[50px] md:h-[9rem] md:w-3/4 lg:mt-[50px] lg:h-[10rem] lg:w-3/4 xlg:h-48 xlg:w-3/4 xxl:h-64 xxl:w-3/4">
        <Image priority src={getAssetPath("assets/new/logo/New-Logo.png")} alt="Shellhacks Logo" layout="fill" objectFit="contain" />
      </div>
    </div>
  );
};

export default Logo;
