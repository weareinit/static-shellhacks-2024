import React, { useState } from "react";
import Image from "next/image";

import Button from "../Button";
import GrassLine from "../GrassLine";
import BeachChairCollection from "../BeachChairCollection";
import Modal from "../Modal";

function SandSection() {
  const [showModal, setShowModal] = useState(false);
  const modal = (
    <Modal>
      <h1>Hello World!</h1>
    </Modal>
  );

  return (
    <section className="grid col-span-1 md:col-span-5 justify-center items-center align-middle min-h-[60vh] relative">
      {/* <BeachChairCollection /> */}
      <article className="grid justify-center justify-items-center z-10">
        <Image
          src="/assets/shellhacks_logo.gif"
          alt="ShellHacks2023"
          width={400}
          height={150}
        />
        <h2 className="text-blue text-center font-pixel text-lg m-2">
          {"Florida's Largest Hackathon"}
        </h2>
        <Button
          text="Join the Waitlist!"
          className=""
          onClick={(e) => {
            e.preventDefault();
            setShowModal((prev) => !prev);
          }}
        >
          {showModal && modal}
        </Button>
      </article>
    </section>
  );
}

export default SandSection;
