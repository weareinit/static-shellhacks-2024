import React from "react";

import Image from "next/image";

export interface BeachChairPropsType {
  color: "blue" | "red" | "yellow" | "green";
  row: number;
  column: number;
  chairKey?: string;
}

const CHAIR_COLORS = {
  blue: "/assets/blue_umbrella.png",
  red: "/assets/red_umbrella.png",
  yellow: "/assets/yellow_umbrella.png",
  green: "/assets/green_umbrella.png",
};

const CHAIR_SIZE = 60;

function BeachChair({ color, row, column, chairKey }: BeachChairPropsType) {
  return (
    <div
      key={chairKey}
      className=" col-span-2 pointer-events-none"
      style={{
        gridColumnStart: column,
        gridRowStart: row,
      }}
    >
      <Image alt={`${color} beach chair`} src={CHAIR_COLORS[color]} width={CHAIR_SIZE} height={CHAIR_SIZE} />
    </div>
  );
}

export default BeachChair;
