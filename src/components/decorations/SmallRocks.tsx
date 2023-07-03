import Image from "next/image";
import React from "react";

interface RockProps {
  row: number;
  column: number;
  className?: string;
}

const ROCK_SIZE = 30;

function SmallRocks({ row, column, className }: RockProps) {
  return (
    <div
      className={` ${className}`}
      style={{
        gridRowStart: row,
        gridColumnStart: column,
      }}
    >
      <Image src="/assets/decorations/small_rocks.png" alt="" height={ROCK_SIZE} width={ROCK_SIZE} />
    </div>
  );
}

export default SmallRocks;
