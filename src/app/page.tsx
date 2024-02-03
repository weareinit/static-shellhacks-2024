// import { parseCSV } from "@/util/parseCSV";

import { FormOptionContextProvider } from "@/app/hooks/FormOptionContext";
import { ShowRegistrationProvider } from "@/app/hooks/ShowRegistrationContext";
import Shoreline from "@/app/components/decorations/Shoreline";
import GrassLine from "@/app/components/decorations/Grassline";
import Content from "@/app/components/sections/Content";
import MLHBanner from "@/app/components/decorations/MLHBanner";
import WelcomeDecorations from "@/app/components/decorations/WelcomeDecorations";
import AboutUsDecorations from "@/app/components/decorations/AboutUsDecorations";
import { Metadata } from "next";

export const metadata: Metadata = {
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  title: "",
  description: "",
};

const getSchoolData = async () => {
  // const schoolData: string[] = await parseCSV<string>("https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv");
  // const schools = schoolData
  //   .map((school) => {
  //     return school[0];
  //   })
  //   .splice(1);
  // const countryData: CountryDataType[] = await parseCSV<CountryDataType>("https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv", true);
  // const countries = countryData.map((country) => {
  //   return country.name;
  // });
  // return {
  //     schools,
  //     countries,
  // };
};

export default async function Home() {
  // const { schools, countries } = await getSchoolData()
  return (
    <div className="bg-sand min-w-screen grid min-h-screen grid-cols-1 overflow-x-hidden md:grid-cols-12">
      <div className="col-span-10 col-start-2 col-end-12 row-start-1 flex flex-col">
        {/* <WelcomeDecorations />
        <AboutUsDecorations /> */}
      </div>
      <Shoreline />
      <GrassLine />
      <ShowRegistrationProvider>
        {/* <FormOptionContextProvider schools={schools} countries={countries}> */}
        <Content />
        {/* </FormOptionContextProvider> */}
      </ShowRegistrationProvider>
    </div>
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
