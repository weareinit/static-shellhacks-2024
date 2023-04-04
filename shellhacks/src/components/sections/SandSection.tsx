import React from "react";
import Image from "next/image";

import Button from "../Button";
import GrassLine from "../GrassLine";

function SandSection() {
  return (
    <section className="grid justify-center items-center align-middle min-h-[70vh] relative">
      <GrassLine />
      <article className="grid justify-center justify-items-center z-10">
        <Image
          src="/assets/shellhacks_logo.gif"
          alt="ShellHacks2023"
          width={300}
          height={100}
        />
        <h2 className="text-blue text-center">
          {"Florida's Largest Hackathon"}
        </h2>
        <Button text="Join the Waitlist!" className=" mt-3" />
      </article>
    </section>
  );
}

export default SandSection;
