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

function SearchInput({ label, isRequired, options, ...props }: SearchInputProps) {
  const [field, meta] = useField(props);
  const [searchValue, setSearchValue] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const filteredOptions = options?.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsOptionSelected(false);
  };

  const handleOptionClick = (option: string) => {
    setSearchValue(option);
    setIsOptionSelected(true);
    field.onChange({ target: { name: field.name, value: option } }); // Manually update the formik field value
  };

  const showError = meta.touched && meta.error && !isOptionSelected;

  return (
    <div className="basis-full flex flex-col my-1 relative">
      <Label className="basis-full">{isRequired ? `*${label}` : label}</Label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          className={`border-blue w-full basis-full border-2 p-1 h-8 sm:h-10 font-inter focus:ring-2 ${
            showError
              ? `border-red-600 focus:ring-red-600/50 focus:outline-none`
              : `focus:ring-blue/50`
          }`}
        />
        {searchValue && filteredOptions && filteredOptions.length > 0 && !isOptionSelected && (
          <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md max-h-36 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-2 py-1 cursor-pointer hover:bg-blue-200"
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
