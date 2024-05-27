import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

type QuestionProps = {
  Q: string;
  A: string;
};

const Question: React.FC<QuestionProps> = ({ Q, A }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState("0px");
  const answerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (answerRef.current) {
      setHeight(expanded ? `${answerRef.current.scrollHeight}px` : "0px");
    }
  }, [expanded]);

  return (
    <div className="w-full">
      <div
        className="my-2 cursor-pointer overflow-hidden rounded-xl"
        onClick={toggleExpand}
      >
        <div className="flex w-full items-center justify-between bg-cotton_seed px-4 py-5">
          <h2 className="text-left font-museo text-[30px]">{Q}?</h2>
          <Image
            src="assets/new/misc/arrow_up.svg"
            alt="Toggle Arrow"
            width={40}
            height={40}
            className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <div
          ref={answerRef}
          style={{ height }}
          className="overflow-hidden transition-all duration-300"
        >
          <div className="bg-cotton_seed p-4">
            <p className="text-left font-museoregular text-base">{A}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
