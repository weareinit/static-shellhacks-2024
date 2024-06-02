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
        <h1 className="xxl:text-[80px] text-[60px]">{Number}</h1>
      </b>
      <h4 className="xxl:text-[40px] text-[30px]">{Description}</h4>
    </div>
  );
};

const PreviousNumbers = () => {
  return (
    // TODO: Find a way to be able to not have to call top-[-80px] to center it with the ocean bg/sand bg transition
    <div className="relative top-[-80px] z-10 flex flex-col items-center justify-end gap-10">
      <StatsComponent Number="1600+" Description="HACKERS" />
      <StatsComponent Number="40+" Description="SPONSORS" />
      <StatsComponent Number="$20,000" Description="IN PRIZES" />
      <StatsComponent Number="230+" Description="PROJECTS" />
    </div>
  );
};

export default PreviousNumbers;
