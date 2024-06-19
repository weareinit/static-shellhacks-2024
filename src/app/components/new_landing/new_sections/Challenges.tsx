import React from "react";

const Challenges = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      {/* <div className="font-zoonaji text-[60px] text-white xxs:text-[25px] xsm:text-[40px] sm:text-[40px] md:text-[50px] lg:text-[60px] xlg:text-[60px] xxl:text-[80px]">
        Challenges
      </div>
      <h3 className="font-museo text-white xxs:text-[13px] xsm:text-[15px] md:text-[20px] lg:text-[23px] xlg:text-[25px] xxl:text-[30px]">
        Challenges to be revealed soon...
      </h3> */}
      <a
        href="https://shellhacks-2023.devpost.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="-mt-4 xxl:mt-12"
      >
        {" "}
        <button
          // change the button to a nicer color. right now, it looks like 💩
          className=" bg-english_walnut px-5 font-zoonaji text-[30px] text-cotton_seed transition-colors duration-200 hover:bg-reddish_grey 
          xxs:rounded-[25px] xxs:px-4 xxs:py-2 xxs:text-[15px] 
          xsm:px-4 xsm:py-4 xsm:text-[18px] 
          sm:rounded-[15px] sm:pb-2 sm:pt-3 sm:text-[18px] 
          md:rounded-[20px] md:text-[20px] 
          lg:rounded-[20px] lg:pb-4 lg:pt-5 lg:text-[20px] 
          xlg:rounded-[25px] xlg:text-[30px] 
          xxl:m-8 xxl:rounded-[30px] xxl:px-10 xxl:pb-6 xxl:pt-8 xxl:text-[60px]"
        >
          Check Out Previous Projects
        </button>
      </a>
    </div>
  );
};

export default Challenges;
