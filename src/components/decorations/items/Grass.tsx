import React from "react";

import Image from "next/image";

interface GrassProps {
  column: number;
  row: number;
  className: string;
}

function Grass({ column, row, className }: GrassProps) {
  return (
    <div className={`select-none ${className}`} style={{ gridColumnStart: column, gridRowStart: row }}>
      <Image src="/assets/decorations/grass.png" alt="" draggable="false" />
    </div>
  );
}

export default Grass;
