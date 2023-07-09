import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import ApplicantInfo from "./ApplicantInfo";
import Button from "../input/Button";

interface ApplicantCellPropType {
  data: Prisma.Hacker_ApplicationsUncheckedCreateInput;
  handleAppStatusChange: any;
}

const applicationStatusColorMapping = {
  registered: "#facc15",
  waitlisted: "#a8a29e",
  in_wave: "#7c3aed",
  confirmed: "#22c55e",
  accepted: "#3b82f6",
  withdrawn: "#ef4444",
};

export default function ApplicantCell({ data, handleAppStatusChange }: ApplicantCellPropType) {
  const [showItem, setShowItem] = useState(false);

  const toggleItem = () => {
    setShowItem((prev) => !prev);
  };

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

  const setAppStatus = async (application_status: string) => {
    await handleAppStatusChange.mutate({ hacker_id: data.hacker_id, application_status });
  };

  console.log(applicationStatusColorMapping[data.application_status!]);

  return (
    <div className="bg-white p-3 my-2 rounded-pixel h-fit w-full relative">
      <h3 onClick={toggleItem} className="font-pixel font-bold text-lg decoration-blue hover:cursor-pointer grid grid-cols-8">
        <span className="col-span-2 truncate">
          {data.first_name} {data.last_name}
        </span>

        <span className="col-span-2 truncate"> {new Date(data.created_at!).toLocaleDateString()}</span>

        <span className="col-span-3 truncate"> {data.school}</span>

        <div className="col-span-1 flex justify-between items-center">
          <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: applicationStatusColorMapping[data.application_status!] }} title={data.application_status} />
          <svg className={`transform transition-transform ${showItem ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#3182ce" d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </h3>

      {showItem && (
        <div className="py-4 justify-between items-center gap-3 grid grid-cols-8 px-4">
          <div className="col-span-6">
            <ApplicantInfo data={data} />
          </div>
          <div className="col-span-2 text-white">
            <Button className="md:min-w-[175px] bg-deep_blue text-white hover:underline col-span-1 w-full" onClick={() => openResume(data.resume_path)}>
              <h2 className="font-pixel text-sm py-1">View Resume</h2>
            </Button>

            <Button className="md:min-w-[175px] mt-2 bg-deep_blue text-white hover:underline col-span-1 w-full">
              <h2 className="font-pixel text-sm py-1">Send message</h2>
            </Button>

            <div className="border-b-2 border-gray-600 mt-4" />

            {["registered", "waitlisted"].includes(data.application_status!) && (
              <Button className="md:min-w-[175px] mt-4 bg-green-500 text-white hover:underline col-span-1 w-full" onClick={() => setAppStatus("in_wave")}>
                <h2 className="font-pixel text-sm py-1">Add to Wave</h2>
              </Button>
            )}

            {["registered", "in_wave", "accepted"].includes(data.application_status!) && (
              <Button className="md:min-w-[175px] mt-2 bg-red-500 text-white hover:underline col-span-1 w-full" onClick={() => setAppStatus("waitlisted")}>
                <h2 className="font-pixel text-sm py-1">Waitlist</h2>
              </Button>
            )}

            {["in_wave"].includes(data.application_status!) && (
              <Button className="md:min-w-[175px] mt-2 bg-red-500 text-white hover:underline col-span-1 w-full" onClick={() => setAppStatus("registered")}>
                <h2 className="font-pixel text-sm py-1">Remove From Wave</h2>
              </Button>
            )}

            {["waitlist"].includes(data.application_status!) && (
              <Button className="md:min-w-[175px] mt-2 bg-green-500 text-white hover:underline col-span-1 w-full" onClick={() => setAppStatus("registered")}>
                <h2 className="font-pixel text-sm py-1">Remove From Waitlist</h2>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ApplicantCellNew({ data }: ApplicantCellPropType) {
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
