import React from "react";

interface StatsComponentProps {
  Number: string;
  Description: string;
}

const StatsComponent: React.FC<StatsComponentProps> = ({
  Number,
  Description,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center font-museo text-darker_cyan">
      <b>
        <h1 className="text-[60px] xxs:text-[25px] xsm:text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] xlg:text-[60px] xxl:text-[80px]">
          {Number}
        </h1>
      </b>
      <h4 className="text-[30px] xxs:text-[13px] xsm:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[25px] xlg:text-[40px] xxl:text-[40px]">
        {Description}
      </h4>
    </div>
  );
};

const PreviousNumbers = () => {
  return (
    // TODO: Find a way to be able to not have to call top-[-80px] to center it with the ocean bg/sand bg transition
    <div className="relative top-[-80px] z-10  flex flex-col items-center justify-end gap-10 xxs:mt-[18rem] xxs:gap-3 xsm:mt-[10rem] xsm:gap-10 sm:mt-0 sm:gap-8">
      <p className="relative whitespace-nowrap font-museo text-2xl font-extrabold text-darker_cyan xxs:bottom-8 xsm:bottom-16 xsm:text-4xl sm:text-3xl md:text-5xl lg:text-6xl xlg:text-7xl">
        Last Year&apos;s Numbers
      </p>
      <StatsComponent Number="1200+" Description="HACKERS" />
      <StatsComponent Number="50+" Description="PARTNERS & SPONSORS" />
      <StatsComponent Number="230+" Description="PROJECTS" />
      <StatsComponent Number="20+" Description="WORKSHOPS" />
    </div>
  );
};

export default PreviousNumbers;
