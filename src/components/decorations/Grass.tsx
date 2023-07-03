import React from "react";

import Image from "next/image";

interface GrassProps {
  column: number;
  row: number;
  className: string;
}

function Grass({ column, row, className }: GrassProps) {
  return (
    <div className={` ${className}`} style={{ gridColumnStart: column, gridRowStart: row }}>
      <Image src="/assets/decorations/grass.png" alt="" />
    </div>
  );
}

export default Grass;
