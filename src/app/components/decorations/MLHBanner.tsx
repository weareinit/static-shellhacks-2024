"use client";

import Image from "next/image";

export default function MLHBanner() {
  return (
    <div className="absolute left-12 top-0 z-50 h-28 w-16">
      <Image
        priority
        src="/assets/mlh-trust-badge-white-2024.png"
        fill
        alt="Major League Hacking 2024 Hackathon Season"
      />
    </div>
  );
}
