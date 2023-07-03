import React from "react";
import Image from "next/image";

function SandCastle({ className }: { className: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/assets/decorations/sand_castle.svg" alt="" fill />
    </div>
  );
}

export default SandCastle;
