import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import Papa from "papaparse";
import * as Yup from "yup";

import TextInput from "./form/TextInput";
import SelectInput from "./form/SelectInput";

interface CountryDataType {
  name: string;
  "alpha-2": string;
  "alpha-3": string;
  "country-code": string;
  "iso_3166-2": string;
  region: string;
  "sub-region": string;
  "intermediate-region": string;
  "region-code": string;
  "sub-region-code": string;
  "intermediate-region-code": string;
}

function RegisterForm() {
  const [schools, setSchools] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    function fetchData() {
      // Used to fetch lists of MLH supported schools
      Papa.parse(
        "https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv",
        {
          download: true,
          complete: (results: Papa.ParseResult<string>) => {
            let parsedSchools = results.data.splice(1);
            parsedSchools = Array.from(new Set(parsedSchools));
            setSchools(parsedSchools);
          },
        }
      );
      // Used to fetch lists of supported countries
      Papa.parse(
        "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv",
        {
          download: true,
          header: true,
          complete: (results: Papa.ParseResult<CountryDataType>) => {
            // console.log(results);
            let parsedCountries = results.data.map((country) => {
              return country.name;
            });
            setCountries(parsedCountries);
          },
        }
      );
    }
    fetchData();
  }, []);

  const formValidation = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    age: Yup.number().required().min(18).max(114),
    phoneNumber: Yup.string().required(),
    email: Yup.string().email().required(),
    school: Yup.string().required(),
    gradYear: Yup.number().required().min(2024).max(2030),
    levelOfStudy: Yup.string().required(),
    country: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={formValidation}
      onSubmit={() => {
        return;
      }}
    >
      <Form>
        <TextInput label="First Name" name="firstName" type="text" />
        <TextInput label="Last Name" name="lastName" type="text" />
        <TextInput label="Age" name="age" type="number" min={18} max={114} />
        <TextInput label="Phone Number" name="phoneNumber" type="tel" />
        <TextInput label="Email" name="email" type="email" />
        <SelectInput label="School" name="school" options={schools} />
      </Form>
    </Formik>
  );
}

export default RegisterForm;
