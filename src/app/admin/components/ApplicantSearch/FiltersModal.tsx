import {
  ApplicantFilters,
  application_status_with_any,
} from "@/app/schemas/applicantSchemas";
import { createPortal } from "react-dom";
import schools from "../../../../../public/registration_data/schools.json";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ApplicantFilters;
  setFilters: React.Dispatch<React.SetStateAction<ApplicantFilters>>;
}

export default function FiltersModal({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FiltersModalProps) {
  const handleFilterOptionChange = (
    key: keyof ApplicantFilters,
    value: string,
  ) => {
    if (value === "any") {
      setFilters((prevFilters) => {
        const { [key]: _, ...rest } = prevFilters;
        return rest;
      });
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({});
  };

  return isOpen
    ? createPortal(
        <div className="fixed inset-0 z-[50] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="z-[100] rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="font-zoonaji text-lg font-medium text-gray-900">
                Filters
              </h2>
              <button
                className="text-black hover:text-red-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4 font-museo">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Application Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.application_status || "any"}
                    onChange={(e) =>
                      handleFilterOptionChange(
                        "application_status",
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {application_status_with_any.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="grad_year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Grad Year
                  </label>
                  <select
                    id="grad_year"
                    name="grad_year"
                    value={filters.grad_year || "any"}
                    onChange={(e) =>
                      handleFilterOptionChange("grad_year", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {["any", 2023, 2024, 2025, 2026, 2027, 2028, 2029].map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="grad_year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    School
                  </label>
                  <select
                    id="school"
                    name="school"
                    value={filters.school || "any"}
                    onChange={(e) =>
                      handleFilterOptionChange("school", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="any">any</option>
                    {schools.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 px-4 py-3">
              <button
                className="mr-2 cursor-pointer p-2 font-museo font-bold text-red-500 hover:text-red-500/90"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                className="min-w-full cursor-pointer rounded-md bg-[#78644F] p-2 font-museo font-bold text-white hover:bg-[#78644F]/90 sm:min-w-[100px] sm:rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
