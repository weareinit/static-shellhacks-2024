import React from "react";
import Image from "next/image";

export enum TreeSide {
  left = "left_tree.svg",
  right = "right_tree.svg",
}

function PalmTree({ className, treeSide }: { className: string; treeSide: TreeSide }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={`/assets/decorations/${treeSide}`} alt="" fill />
    </div>
  );
}

export default PalmTree;
