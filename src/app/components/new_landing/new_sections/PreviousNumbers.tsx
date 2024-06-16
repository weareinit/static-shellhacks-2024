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
      <h4 className="text-[30px] xxs:text-[15px] xsm:text-[18px] sm:text-[18px] md:text-[20px] lg:text-[25px] xlg:text-[40px] xxl:text-[40px]">
        {Description}
      </h4>
    </div>
  );
};

const PreviousNumbers = () => {
  return (
    // TODO: Find a way to be able to not have to call top-[-80px] to center it with the ocean bg/sand bg transition
    <div className="relative top-[-80px] z-10  flex flex-col items-center justify-end gap-10 xxs:mt-[10rem] xxs:gap-3 xsm:mt-[10rem] xsm:gap-10 sm:gap-8">
      <StatsComponent Number="1300+" Description="HACKERS" />
      <StatsComponent Number="40+" Description="SPONSORS" />
      <StatsComponent Number="$20,000+" Description="IN PRIZES" />
      <StatsComponent Number="230+" Description="PROJECTS" />
    </div>
  );
};

export default PreviousNumbers;
