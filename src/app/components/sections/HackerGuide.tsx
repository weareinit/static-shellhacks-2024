import { useHackerGuideContext } from "@/app/hooks/ShowHackerGuideContext";
import React from "react";
import { createPortal } from "react-dom";

import { AiOutlineClose } from "react-icons/ai";

export default function HackerGuide() {
  const { setShowHackerGuide } = useHackerGuideContext();

  const hackerGuide = (
    <section className="fixed top-0 left-0">
      <AiOutlineClose className="absolute top-3 right-5 text-xl z-10 font-black cursor-pointer" onClick={() => setShowHackerGuide(false)} />
      <iframe src="https://www.notioniframe.com/notion/12hav6i2m7w" className="w-screen h-screen"></iframe>;
    </section>
  );
  return createPortal(hackerGuide, document.getElementById("hacker-guide-container") as Element);
}
