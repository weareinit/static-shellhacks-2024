import React from "react";
import Image from "next/image";

function SandCastle({ className }: { className: string }) {
  return (
    <div className={`relative select-none ${className}`}>
      <Image src="/assets/decorations/sand_castle.svg" alt="" fill draggable="false" />
    </div>
  );
}

export default SandCastle;
