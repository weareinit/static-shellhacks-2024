import { parseCSV } from "@/util/parseCSV";

import { FormOptionContextProvider } from "@/hooks/FormOptionContext";
import { ShowRegistrationProvider } from "@/hooks/ShowRegistrationContext";
import Shoreline from "@/components/decorations/Shoreline";
import GrassLine from "@/components/decorations/Grassline";
import Content from "@/components/sections/Content";
import MLHBanner from "@/components/decorations/MLHBanner";
import Decorations from "@/components/decorations/Decorations";

interface HomeProps {
  schools: string[];
  countries: string[];
}

export default function Home({ schools, countries }: HomeProps) {
  return (
    <div className="bg-sand min-h-screen min-w-screen grid grid-cols-1 md:grid-cols-12">
      <Decorations />
      <Shoreline />
      <GrassLine />
      <ShowRegistrationProvider>
        <FormOptionContextProvider schools={schools} countries={countries}>
          <Content />
        </FormOptionContextProvider>
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

export async function getStaticProps() {
  const schoolData: string[] = await parseCSV<string>("https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv");

  const schools = schoolData
    .map((school) => {
      return school[0];
    })
    .splice(1);

  const countryData: CountryDataType[] = await parseCSV<CountryDataType>("https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv", true);

  const countries = countryData.map((country) => {
    return country.name;
  });

  return {
    props: {
      schools,
      countries,
    },
  };
}
