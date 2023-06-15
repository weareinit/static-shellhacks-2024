import React from "react";

import Image from "next/image";

export interface BeachChairPropsType {
  color: "blue" | "red" | "yellow" | "green";
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

const CHAIR_COLORS = {
  blue: "/assets/blue_umbrella.png",
  red: "/assets/red_umbrella.png",
  yellow: "/assets/yellow_umbrella.png",
  green: "/assets/green_umbrella.png",
};

const CHAIR_SIZE = 50;

function BeachChair({ color, top, left, right, bottom }: BeachChairPropsType) {
  return (
    <div
      className="absolute"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
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
