import React, { useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import ApplicantInfo from "./ApplicantInfo";
import Button from "../input/Button";
import type { AppStatusMutationType } from "@/hooks/ApplicationStatusMutation";
import { applicantStatusChangeSchema } from "@/schemas/applicantSchemas";

interface ApplicantCellPropType {
  data: Prisma.Hacker_ApplicationsUncheckedCreateInput;
  handleAppStatusChange: AppStatusMutationType;
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

  const openResume = async (email: string) => {
    const response = await fetch(`/api/resumes/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "applicant/json",
      },
    });

    // Use message from response
    if (!response.ok) {
      throw new Error("Error fetching applicant");
    }

    const { url } = await response.json();
    window.open(url, "_blank");
  };

  const setAppStatus = async (application_status: string) => {
    const payload = applicantStatusChangeSchema.parse({ hacker_id: data.hacker_id, application_status });
    await handleAppStatusChange.mutate(payload);
  };

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
            <Button className="md:min-w-[175px] bg-deep_blue text-white hover:underline col-span-1 w-full" onClick={() => openResume(data.email)}>
              <h2 className="font-pixel text-sm py-1">View Resume</h2>
            </Button>

            <a href={`mailto:${data.email}`}>
              <Button className="md:min-w-[175px] mt-2 bg-deep_blue text-white hover:underline col-span-1 w-full">
                <h2 className="font-pixel text-sm py-1">Send message</h2>
              </Button>
            </a>

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

            {["accepted", "confirmed"].includes(data.application_status!) && (
              <Button className="md:min-w-[175px] mt-2 bg-pink text-white hover:underline col-span-1 w-full" onClick={() => setAppStatus("checked_in")}>
                <h2 className="font-pixel text-sm py-1">Check in</h2>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
