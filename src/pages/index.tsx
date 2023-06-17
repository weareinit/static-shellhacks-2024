import { parseCSV } from "@/util/parseCSV";
import { FormOptionContextProvider } from "@/hooks/FormOptionContext";
import { ShowRegistrationProvider } from "@/hooks/ShowRegistrationContext";
import SandSection from "@/components/sections/SandSection";
import ShorelineSection from "@/components/sections/ShorelineSection";
import GrassLine from "@/components/GrassLine";
import Image from "next/image";

interface HomeProps {
  schools: string[];
  countries: string[];
}

export default function Home({ schools, countries }: HomeProps) {
  return (
    <main className="bg-sand min-h-screen grid grid-cols-1 md:grid-cols-9">
      <div className="w-16 h-28 absolute top-0 left-4 z-1000">
        <Image
          src="/assets/mlh-trust-badge-white-2024.png"
          fill
          alt="Major League Hacking 2024 Hackathon Season"
        />
      </div>

      <ShorelineSection />
      <ShowRegistrationProvider>
        <FormOptionContextProvider schools={schools} countries={countries}>
          <SandSection />
        </FormOptionContextProvider>
      </ShowRegistrationProvider>
      <GrassLine />
    </main>
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
  const schoolData: string[] = await parseCSV<string>(
    "https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv"
  );

  const schools = schoolData
    .map((school) => {
      return school[0];
    })
    .splice(1);

  const countryData: CountryDataType[] = await parseCSV<CountryDataType>(
    "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.csv",
    true
  );

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
