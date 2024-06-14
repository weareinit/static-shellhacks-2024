import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <div className="relative sm:mt-[10rem] sm:h-[10rem] sm:w-1/2 md:mt-[50px] md:h-[9rem] md:w-3/4 lg:mt-[50px] lg:h-[10rem] lg:w-3/4 xlg:h-48 xlg:w-3/4 xxl:h-64 xxl:w-3/4">
        <Image
          priority
          src="/assets/new/logo/Shell Logo.svg"
          alt="Shellhacks Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Logo;
