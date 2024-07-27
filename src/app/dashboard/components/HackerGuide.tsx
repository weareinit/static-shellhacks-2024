import React from "react";
import Link from "next/link";
import CustomButton from "./CustomButton";

const HackerGuide = () => {
  return (
    <div className="mt-4 flex flex-col items-start gap-2">
      <p className="font-museo text-xl">Hacker Guide:</p>
      <div className="flex flex-col gap-2">
        <a href={"https://weareinit.notion.site/Hacker-Guide-7a66ddf256fc4b75a6ff85c176e55b63"} target="_blank">
          <CustomButton colorVariant={2}>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              <span className="mt-1">Hacker Guide</span>
            </div>
          </CustomButton>
        </a>
      </div>
    </div>
  );
};

export default HackerGuide;
