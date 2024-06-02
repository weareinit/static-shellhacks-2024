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
        className="xxl:my-4 my-2 cursor-pointer overflow-hidden rounded-xl"
        onClick={toggleExpand}
      >
        <div className="xxl:px-6 xxl:py-8 flex w-full items-center justify-between bg-cotton_seed px-4 py-5">
          <h2 className="xxl:text-[45px] text-left font-museo text-[30px]">
            {Q}?
          </h2>
          <Image
            priority
            src="assets/new/misc/arrow_up.svg"
            alt="Toggle Arrow"
            width={40}
            height={40}
            className={`xxl:w-[80px] xxl:h-[80px] transform transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <div
          ref={answerRef}
          style={{ height }}
          className="overflow-hidden transition-all duration-300"
        >
          <div className="xxl:p-8 bg-cotton_seed p-4">
            <h3 className="xxl:text-[2rem] xxl:leading-[40px] text-left font-museoregular text-base">
              {A}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
