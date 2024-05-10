import Image from "next/image";

const Logo = () => {
  return (
      <div className="relative mx-auto h-36 mt-[4.5rem] w-1/3">
      <Image
        src="/assets/new/logo/Horizontal Logo.svg"
        alt="Shellhacks Logo"
        fill
      />
    </div>
  );
}

export default Logo