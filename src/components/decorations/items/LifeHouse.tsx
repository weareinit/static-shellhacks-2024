import React from "react";
import Image from "next/image";

interface LifeHouseProps {
  className?: string;
}

function LifeHouse({ className }: LifeHouseProps) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/assets/decorations/life_house.svg" alt="" fill />
    </div>
  );
}

export default LifeHouse;
