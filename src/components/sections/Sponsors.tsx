import Image from "next/image";
import ExpandedSection from "../ExpandedSection";

export function SponsorImage({ className, src, alt }: { className?: string; src: string; alt: string }) {
  return (
    <div className={`col-span-2 min-w-[200px] min-h-[150px] w-full relative ${className}`}>
      <Image src={src} alt={alt} className=" object-contain p-5" fill />
    </div>
  );
}

function Sponsors() {
  return (
    <ExpandedSection className=" m-4 p-4 pt-36 flex flex-col justify-center items-center" id="sponsors">
      <>
        <h1 className=" text-4xl text-crate_brown text-center ">Organized By</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          <SponsorImage src="/assets/sponsors/INIT_FIU.svg" alt="INIT FIU's Logo" className="col-span-2 md:col-span-12" />
        </div>
        <h1 className=" text-4xl text-crate_brown text-center pt-5">Powered By</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="col-span-2 md:col-span-12" />
          <div className="col-span-2 md:col-span-12 min-h-[5px] bg-dark_brown rounded-lg" />
        </div>
        <h1 className=" text-4xl text-crate_brown text-center pt-10">Sponsors</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          <SponsorImage src="/assets/sponsors/Xbox.svg" alt="Xbox Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Vanguard.svg" alt="Vanguard Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Bitstop.svg" alt="Bitstop Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Breakthrough_Tech.svg" alt="Breakthrough Tech Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Google.svg" alt="Google Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Waymo.svg" alt="Waymo Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Meta.svg" alt="Meta Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Capital_One.svg" alt="Capital One Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/State_Farm.svg" alt="State Farm Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Southwest.svg" alt="Southwest Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Schonfeld.svg" alt="Schonfeld Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Assurant.svg" alt="Assurant Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Addigy.svg" alt="Addigy Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Lexis_Nexis.svg" alt="Lexis Nexis Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Ford.svg" alt="Ford Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Cutting_Edge_AI.svg" alt="Cutting Edge AI Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Elfen_Software.svg" alt="Elfen Software Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/FIU_ELT.svg" alt="FIU ELT Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Miami_Dade_County.svg" alt="Miami Dade County Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Mediastream.svg" alt="Mediastream Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Adobe.svg" alt="Adobe Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/NVIDIA.svg" alt="Nvidia Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Chevron.svg" alt="Chevron Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Accenture.svg" alt="Accenture Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Wells_Fargo.svg" alt="Wells Fargo Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Service_Now.svg" alt="Service Now Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Miami_Tech_Works.svg" alt="Miami Tech Works Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/FIU_SGA.svg" alt="FIU SGA Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/GDG.svg" alt="Google Developer Student Club Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/CodePath.svg" alt="CodePath Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/MLT.svg" alt="MLT Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/GitHub.svg" alt="GitHub Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/emerge_logo.svg" alt="eMerge Americas Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/GCP.svg" alt="Google Cloud Logo" className="md:col-span-4" />
          <SponsorImage src="/assets/sponsors/Jetbrains.svg" alt="Jet Brains IDE Logo" className="md:col-span-4" />
        </div>
      </>
    </ExpandedSection>
  );
}

export default Sponsors;
