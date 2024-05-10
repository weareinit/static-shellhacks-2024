import Image from "next/image";

const Logo = () => {
  return (
    <div className="relative mx-auto h-1/3 w-1/3">
      <Image
        src="/assets/new/logo/Horizontal Logo.svg"
        alt="Shellhacks Logo"
        fill
      />
    </div>
  );
}

export default Logo