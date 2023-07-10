import { useState, useEffect } from "react";
import { gradYearOptions } from "@/util/RegistrationData";
import Label from "../input/Label";
import z from "zod";
import { applicantFiltersSchema } from "@/schemas/applicantSchemas";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;

interface FiltersPropType {
  filters: Record<string, any>;
  setFilters: any;
  schools: string[];
}

const gradYears = ["any", ...gradYearOptions];

export default function Filters({ filters, setFilters, schools }: FiltersPropType) {
  const applicationStatusOptions = ["any", "registered", "in_wave", "accepted", "withdrawn", "confirmed", "waitlisted"];

  const schoolOptions = ["any", ...schools];

  const handleFilterChange = (field: string, value: string) => {
    if (value === "any" && filters[field]) {
      const { [field]: _, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters((prev: Record<string, string>) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="bg-white p-3 my-2 rounded-pixel h-fit w-full">
      <h3 className="text-2xl mb-3 font-pixel font-bold">Filters</h3>

      <div className="flex flex-col">
        <div className="my-1">
          <Label>Application Status:</Label>
          <select
            className="cursor-pointer bg-white rounded-none p-1 ml-2"
            id="applicationStatus"
            value={filters["application_status"] || "any"}
            onChange={(e) => handleFilterChange("application_status", e.target.value)}
          >
            {applicationStatusOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="my-1">
          <Label>Graduation year:</Label>
          <select className="cursor-pointer bg-white rounded-none p-1 ml-2" id="gradYear" value={filters["grad_year"] || "any"} onChange={(e) => handleFilterChange("grad_year", e.target.value)}>
            {gradYears.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="my-1">
          <Label>School:</Label>
          <select className="cursor-pointer bg-white rounded-none p-1 ml-2" id="school" value={filters["school"] || "any"} onChange={(e) => handleFilterChange("school", e.target.value)}>
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
