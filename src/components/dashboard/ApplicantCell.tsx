import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import ApplicantInfo from "./ApplicantInfo";
interface ApplicantCellPropType {
  data: Prisma.Hacker_ApplicationsUncheckedCreateInput;
}

export default function ApplicantCell({ data }: ApplicantCellPropType) {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  const openResume = async (resumePath: string) => {
    const response = await fetch(`/api/resumes/getResume?resumeId=${resumePath}`, {
      method: "GET",
      headers: {
        "Content-Type": "applicant/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching applicant");
    }

    const { url } = await response.json();
    window.open(url, "_blank");
  };

  function toggleAccordion() {
    setActive((prevState) => !prevState);
    // @ts-ignore
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(active ? "transform duration-700 ease" : "transform duration-700 ease rotate-180");
  }

  return (
    <div className="flex flex-col my-2">
      <button className="p-4 rounded-sm box-border shadow-md appearance-none cursor-pointer focus:outline-none grid grid-cols-7 bg-gray-50" onClick={toggleAccordion}>
        <p className="col-span-3 text-left">
          {data.first_name} {data.last_name}
        </p>
        <p className="col-span-3 text-left truncate">{data.school}</p>

        <div className="flex flex-row justify-between col-span-1">
          <div className="w-4 h-4 bg-blue rounded-full" />

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${rotate}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>
      <div ref={contentSpace} style={{ maxHeight: `${height}` }} className="overflow-auto transition-max-height duration-700 ease-in-out">
        <div className="py-4 grid grid-cols-7 space-x-2">
          <div className="col-span-5">
            <ApplicantInfo data={data} />
          </div>
          <div className="col-span-2 text-white">
            <button className="w-full mb-2 py-2 bg-sky-600 rounded-sm" onClick={() => openResume(data.resume_path)}>
              View Resume
            </button>
            <button className="w-full py-2 bg-sky-600 rounded-sm " onClick={() => openResume(data.resume_path)}>
              Send Message
            </button>
            <div className="border-b-2 border-gray-600 mt-5" />
            <button className="w-full mb-2 py-2 mt-5 bg-green-600 rounded-sm">Add to Wave</button>
            <button className="w-full py-2 bg-red-500 rounded-sm">Waitlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
