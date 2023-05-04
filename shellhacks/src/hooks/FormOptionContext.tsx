import React, { useContext } from "react";

interface FormOptionType {
  schools: string[];
  countries: string[];
}

const FormOptionContext = React.createContext<FormOptionType>({
  schools: [],
  countries: [],
});

export function useFormOptionContext() {
  return useContext(FormOptionContext);
}

export function FormOptionContextProvider({
  children,
  schools,
  countries,
}: {
  children: React.ReactNode;
  schools: string[];
  countries: string[];
}) {
  return (
    <FormOptionContext.Provider value={{ schools, countries }}>
      {children}
    </FormOptionContext.Provider>
  );
}
