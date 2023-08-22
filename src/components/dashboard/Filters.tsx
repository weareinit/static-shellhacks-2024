import { gradYearOptions } from "@/util/RegistrationData";
import { application_statuses } from "@/schemas/applicantSchemas";

interface FiltersPropType {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  schools: string[];
}

interface FilterPropType {
  label: string;
  options: readonly string[];
  filters: Record<string, any>;
  handleOnChange: any;
  filterName: string;
}

const gradYears = ["any", ...gradYearOptions];

const Filter = ({ label, filterName, options, filters, handleOnChange }: FilterPropType) => {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      <p className="font-pixel p-1">{label}</p>
      <select className="cursor-pointer bg-white rounded-none p-1 max-w-xs overflow-ellipsis" id={filterName} value={filters[filterName] || "any"} onChange={handleOnChange}>
        {options.map((state, i) => (
          <option key={i} value={state} className="truncate">
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Filters({ filters, setFilters, schools }: FiltersPropType) {
  const applicationStatusOptions = ["any", ...application_statuses];

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
        <Filter
          label="Application Status:"
          filterName="application_status"
          options={applicationStatusOptions}
          filters={filters}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("application_status", e.target.value)}
        />

        <Filter
          label="Graduation year:"
          filterName="grad_year"
          options={gradYears}
          filters={filters}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("grad_year", e.target.value)}
        />

        <Filter
          label="School:"
          filterName="school"
          options={schoolOptions}
          filters={filters}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("school", e.target.value)}
        />
      </div>
    </div>
  );
}
