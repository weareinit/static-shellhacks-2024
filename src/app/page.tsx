import { parseCSV } from "@/app/util/parseCSV";
import type { Metadata } from "next";
import { getServerAuthSession } from "@/server/auth";
import Login from "./components/Login";
import Image from "next/image";
import Landing from "./components/new_landing/Landing";

export const metadata: Metadata = {
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  title: "",
  description: "",
};

const getSchoolData = async () => {
  const schoolData: string[] = await parseCSV<string>(
    "https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv",
  );
  const schools = schoolData
    .map((school) => {
      return school[0];
    })
    .splice(1);
  const countryData: CountryDataType[] = await parseCSV<CountryDataType>(
    "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv",
    true,
  );
  const countries = countryData.map((country) => {
    return country.name;
  });
  return {
    schools,
    countries,
  };
};

export default async function Home() {
  const { schools, countries } = await getSchoolData();
  const stuff = await getServerAuthSession();

  return (
    <>
      <Landing />
    </>
  );
}

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
