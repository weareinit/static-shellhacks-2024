import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <div className="relative mt-[4.5rem] h-36 w-1/3">
        <Image
          priority
          src="/assets/new/logo/Horizontal Logo.svg"
          alt="Shellhacks Logo"
          fill
        />
      </div>
    </div>
  );
};

export default Logo;
