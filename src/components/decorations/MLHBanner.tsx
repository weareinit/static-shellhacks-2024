import Image from "next/image";

export default function MLHBanner() {
  return (
    <div className="w-16 h-28 absolute top-0 left-4 z-1000">
      <Image src="/assets/mlh-trust-badge-white-2024.png" fill alt="Major League Hacking 2024 Hackathon Season" />
    </div>
  );
}
