import React from "react";

import Image from "next/image";

interface BeachChairPropsType {
  color: "blue" | "red" | "yellow" | "green";
  x: number;
  y: number;
}

const CHAIR_COLORS = {
  blue: "/assets/blue_umbrella.png",
  red: "/assets/red_umbrella.png",
  yellow: "/assets/yellow_umbrella.png",
  green: "/assets/green_umbrella.png",
};

const CHAIR_SIZE = 50;

function BeachChair({ color, x, y }: BeachChairPropsType) {
  return (
    <div
      className="absolute"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <Image
        alt={`${color} beach chair`}
        src={CHAIR_COLORS[color]}
        width={CHAIR_SIZE}
        height={CHAIR_SIZE}
      />
    </div>
  );
}

export default BeachChair;
