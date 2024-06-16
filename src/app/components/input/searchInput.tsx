import React, { useState } from "react";
import { useField } from "formik";
import Error from "./Error";
import Label from "./Label";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isRequired?: boolean;
  options?: string[];
}

function SearchInput({
  label,
  isRequired,
  options,
  ...props
}: SearchInputProps) {
  const [field, meta] = useField(props);
  const [searchValue, setSearchValue] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsOptionSelected(false);
  };

  const handleOptionClick = (option: string) => {
    setSearchValue(option);
    setIsOptionSelected(true);
    field.onChange({ target: { name: field.name, value: option } });
  };

  const handleInputBlur = () => {
    // Check if the input matches any option, if not, set it to "Other"
    if (searchValue.trim() !== "" && !filteredOptions?.length) {
      setSearchValue("Other");
      setIsOptionSelected(true);
      field.onChange({ target: { name: field.name, value: "Other" } });
    } else {
      setIsOptionSelected(false);
    }
  };

  const showError = meta.touched && meta.error && !isOptionSelected;

  return (
    <div className="relative my-1 flex basis-full flex-col">
      <Label className="basis-full font-museo font-bold">
        {isRequired ? `*${label}` : label}
      </Label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onBlur={handleInputBlur}
          className={`font-inter h-8 w-full basis-full rounded-lg border border-black bg-[#E9DBCC] p-3 focus:ring-2 sm:h-10 ${
            showError
              ? `border-red-600 focus:outline-none focus:ring-red-600/50`
              : `focus:ring-blue/50`
          }`}
        />
        {searchValue &&
          filteredOptions &&
          filteredOptions.length > 0 &&
          !isOptionSelected && (
            <ul className="absolute left-0 right-0 font-bold z-10 mt-2 max-h-36 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-2 py-1 hover:bg-blue-200"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
      </div>
      {showError && <Error>{meta.error}</Error>}
    </div>
  );
}

export default SearchInput;
