"use client";

import Image from "next/image";

export default function MLHBanner() {
  return (
    <div className="absolute left-12 top-0 z-50 xxs:h-[75px] xxs:w-[37.5px] md:h-28 md:w-16 xlg:h-[150px] xlg:w-[75px] xxl:h-[200px] xxl:w-[100px]">
      <Image
        priority
        src="/assets/mlh-trust-badge-2025-white.png"
        fill
        alt="Major League Hacking 2024 Hackathon Season"
      />
    </div>
  );
}
