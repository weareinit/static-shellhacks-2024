import React from "react";

import { BeachChairPropsType } from "./BeachChair";
import BeachChair from "./BeachChair";

export default function BeachChairSection() {
  const BEACH_CHAIR_POSITIONS: BeachChairPropsType[] = [
    { left: 50, top: 90, color: "red" },
    { left: 125, top: 90, color: "red" },
    { left: 200, top: 90, color: "red" },
    { left: 30, top: 40, color: "red" },
    { left: 105, top: 40, color: "red" },
    { left: 180, top: 40, color: "red" },
    { left: 255, top: 40, color: "red" },
    { bottom: 40, left: 40, color: "green" },
    { bottom: 35, left: 300, color: "blue" },
    { bottom: 35, left: 175, color: "yellow" },
  ];

  function generateRedUmbrellas() {
    return BEACH_CHAIR_POSITIONS.map((position) => {
      return (
        <BeachChair
          color={position.color}
          left={position.left}
          top={position.top}
          bottom={position.bottom}
          right={position.right}
        />
      );
    });
  }

  return <div className="relative contents">{generateRedUmbrellas()}</div>;
}
