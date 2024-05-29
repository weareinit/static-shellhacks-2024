import PreviousNumbers from "./PreviousNumbers";
import BigDinos from "./BigDinos";
import React from "react";
import Image from "next/image";

const DinosAndNumbers = () => {
  return (
    <div className="relative">
      <Image
        priority
        src="/assets/new/background/beach/Beach.png"
        layout="responsive"
        width={1730}
        height={973}
        alt="Beach background"
        className="relative z-[-10]"
      />

      {/* Content -> Absolute to the subsection, relative overall */}
      <div className="absolute inset-0">
        <PreviousNumbers />
        <BigDinos />
      </div>
    </div>
  );
};

export default DinosAndNumbers;
