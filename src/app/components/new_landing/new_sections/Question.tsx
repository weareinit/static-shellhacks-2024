import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

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
      <div className="my-2 cursor-pointer overflow-hidden rounded-xl xlg:my-3 xxl:my-4" onClick={toggleExpand}>
        <div className="flex w-full items-center justify-between bg-cotton_seed xxs:px-4 xxs:py-1 sm:px-4 sm:py-2 md:px-4 md:py-5 xlg:px-5 xlg:py-8 xxl:px-6 xxl:py-8">
          <h2 className="text-left font-museo xxs:py-2 xxs:text-[15px] xsm:text-[18px]  sm:text-[20px] md:text-[30px] xlg:text-[35px] xxl:text-[45px]">{Q}?</h2>
          <Image
            priority
            src={getAssetPath("assets/new/misc/arrow_up.svg")}
            alt="Toggle Arrow"
            width={40}
            height={40}
            className={`transform transition-transform duration-300 xxs:h-[30px] xxs:w-[30px] xlg:h-[60px] xlg:w-[60px] xxl:h-[80px] xxl:w-[80px] ${expanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <div ref={answerRef} style={{ height }} className="overflow-hidden transition-all duration-300">
          <div className="bg-cotton_seed p-4 xlg:p-6 xxl:p-8">
            <h3 className="text-left font-museoregular xxs:text-[13px] xsm:text-base xlg:text-[1.5rem] xlg:leading-[30px] xxl:text-[2rem] xxl:leading-[40px]">{A}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
