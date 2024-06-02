import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <div className="xxl:h-60 xxl:w-1/2 xlg:h-40 xlg:w-1/3  relative mt-[4.5rem]">
        <Image
          priority
          src="/assets/new/logo/Horizontal Logo.svg"
          alt="Shellhacks Logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Logo;
