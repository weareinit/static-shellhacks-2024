import { useReducer, useState, useEffect } from "react";
import { ethnicityOptions, genderOptions, levelsOfStudy, majorOptions, pronounOptions, ApplicantValues, formValidation, gradYearOptions } from "@/util/RegistrationData";
import SelectInput from "../input/SelectInput";
import { Formik, Form, FormikProps } from "formik";
import SearchInput from "../input/searchInput";
import Label from "../input/Label";
import { useFormOptionContext } from "@/hooks/FormOptionContext";

interface FiltersPropType {
  handleFilterChange: (filters: any) => void;
}

const gradYears = ["any", ...gradYearOptions];

export default function Filters({ handleFilterChange }: FiltersPropType) {
  const applicationStatusOptions = ["registered", "in_wave", "accepted", "withdrawn", "confirmed"];
  const [applicationStatus, setApplicationStatus] = useState("registered");
  const [school, setSchool] = useState("any");
  const [gradYear, setGradYear] = useState("any");

  //const { schools, countries } = useFormOptionContext();
  const schools = ["any", "Florida International University", "The University of Florida"];

  useEffect(() => {
    let filters: Record<string, string> = { application_status: applicationStatus };
    if (school !== "any") filters = { ...filters, school };
    if (gradYear !== "any") filters = { ...filters, grad_year: gradYear };

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
            {schools.map((state) => (
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

/*
/* Application Status Filter
      <div className="mb-4">
        <label htmlFor="applicationStatus" className="mr-2">
          Application Status:
        </label>
        <select id="applicationStatus" value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)}>
          {applicationStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>*/
