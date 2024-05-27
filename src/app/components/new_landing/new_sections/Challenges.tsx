import React from "react";

const Challenges = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="font-zoonaji text-[60px] text-white">Challenges</div>
      <h3 className="text[25px] font-museo text-white">
        Challenges to be revealed soon...
      </h3>
      <a
        href="https://shellhacks-2023.devpost.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6"
      >
        {" "}
        <button className="m5-4 rounded-[30px] bg-cotton_seed px-5 pb-3 pt-4 font-zoonaji text-[30px] text-english_walnut hover:bg-reddish_grey">
          See Previous ShellHacks...
        </button>
      </a>
    </div>
  );
};

export default Challenges;
