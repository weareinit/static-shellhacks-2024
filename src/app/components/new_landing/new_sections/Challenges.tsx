import React from "react";

const Challenges = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="xxl:text-[80px] font-zoonaji text-[60px] text-white">
        Challenges
      </div>
      <h3 className="xxl:text-[30px] font-museo text-[25px] text-white">
        Challenges to be revealed soon...
      </h3>
      <a
        href="https://shellhacks-2023.devpost.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="xxl:mt-12 mt-6"
      >
        {" "}
        <button className="xxl:text-[60px] xxl: xxl:rounded-[60px]  xxl:px-10 xxl:pb-6 xxl:pt-8  xxl:m-8 rounded-[30px] bg-cotton_seed px-5 pb-3 pt-4 font-zoonaji text-[30px] text-english_walnut hover:bg-reddish_grey">
          See Previous ShellHacks...
        </button>
      </a>
    </div>
  );
};

export default Challenges;
