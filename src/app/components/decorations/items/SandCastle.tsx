import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

function SandCastle({ className }: { className: string }) {
  return (
    <div className={`relative select-none ${className}`}>
      <Image src={getAssetPath("assets/decorations/sand_castle.svg")} alt="" fill draggable="false" />
    </div>
  );
}

export default SandCastle;
