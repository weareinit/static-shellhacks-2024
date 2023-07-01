import { useReducer, useState, useEffect } from "react";

export default function Filters({ updateFilters }) {
  const applicationStates = ["pending", "in-wave", "accepted", "withdrawn", "waitlisted"];
  const [applicationStatus, setApplicationStatus] = useState("pending");

  const updateFilters = useEffect;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-2xl mb-4">Filters</h3>

      {/* Application Status Filter */}
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
      </div>
    </div>
  );
}
