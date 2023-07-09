import { useState, useEffect } from "react";
import { gradYearOptions } from "@/util/RegistrationData";
import Label from "../input/Label";

interface FiltersPropType {
  handleFilterChange: (filters: any) => void;
  schools: string[];
}

const gradYears = ["any", ...gradYearOptions];

export default function Filters({ handleFilterChange, schools }: FiltersPropType) {
  const applicationStatusOptions = ["any", "registered", "in_wave", "accepted", "withdrawn", "confirmed"];
  const [applicationStatus, setApplicationStatus] = useState("any");
  const [school, setSchool] = useState("any");
  const [gradYear, setGradYear] = useState("any");

  const schoolOptions = ["any", ...schools];

  useEffect(() => {
    let filters: Record<string, string> = {};
    if (school !== "any") filters = { ...filters, school };
    if (gradYear !== "any") filters = { ...filters, grad_year: gradYear };
    if (applicationStatus !== "any") filters = { ...filters, application_status: applicationStatus };

    handleFilterChange(filters);
  }, [applicationStatus, gradYear, school]);

  return (
    <div className="bg-white p-3 my-2 rounded-pixel h-fit w-full">
      <h3 className="text-2xl mb-3 font-pixel font-bold">Filters</h3>

      <div className="flex flex-col">
        <div className="my-1">
          <Label>Application Status:</Label>
          <select className="cursor-pointer bg-white rounded-none p-1 ml-2" id="applicationStatus" value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)}>
            {applicationStatusOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="my-1">
          <Label>Graduation year:</Label>
          <select className="cursor-pointer bg-white rounded-none p-1 ml-2" id="gradYear" value={gradYear} onChange={(e) => setGradYear(e.target.value)}>
            {gradYears.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="my-1">
          <Label>School:</Label>
          <select className="cursor-pointer bg-white rounded-none p-1 ml-2" id="school" value={school} onChange={(e) => setSchool(e.target.value)}>
            {schoolOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
