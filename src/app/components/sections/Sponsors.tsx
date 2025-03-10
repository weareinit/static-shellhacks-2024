import ExpandedSection from "../ExpandedSection";
import { getAssetPath } from "@/app/util/getAssetPath";

export function SponsorImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img src={src} alt={alt} className="max-h-[100px] object-contain" />
    </div>
  );
}

function Sponsors() {
  return (
    <ExpandedSection className=" m-4 flex flex-col items-center justify-center p-4 pt-36" id="sponsors">
      <>
        <h1 className=" text-crate_brown text-center text-4xl ">Organized By</h1>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-12">
          <SponsorImage src={getAssetPath("assets/sponsors/INIT_FIU.svg")} alt="INIT FIU's Logo" className="col-span-2 md:col-span-12" />
        </div>
        <h1 className=" text-crate_brown pt-5 text-center text-4xl">Powered By</h1>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-12">
          <SponsorImage src={getAssetPath("assets/sponsors/microsoft.svg")} alt="Microsoft Logo" className="col-span-2 md:col-span-12" />
          <div className="bg-dark_brown col-span-2 min-h-[5px] rounded-lg md:col-span-12" />
        </div>
        <h1 className=" text-crate_brown pt-10 text-center text-4xl">Sponsors</h1>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-12">
          <SponsorImage src={getAssetPath("assets/sponsors/Xbox.svg")} alt="Xbox Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Vanguard.svg")} alt="Vanguard Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Bitstop.svg")} alt="Bitstop Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Breakthrough_Tech.svg")} alt="Breakthrough Tech Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Google.svg")} alt="Google Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Waymo.svg")} alt="Waymo Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Meta.svg")} alt="Meta Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Capital_One.svg")} alt="Capital One Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/State_Farm.svg")} alt="State Farm Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Southwest.svg")} alt="Southwest Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Schonfeld.svg")} alt="Schonfeld Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Assurant.svg")} alt="Assurant Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Addigy.svg")} alt="Addigy Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Lexis_Nexis.svg")} alt="Lexis Nexis Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Ford.svg")} alt="Ford Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Cutting_Edge_AI.svg")} alt="Cutting Edge AI Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Elfen_Software.svg")} alt="Elfen Software Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/FIU_ELT.svg")} alt="FIU ELT Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Miami_Dade_County.svg")} alt="Miami Dade County Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Mediastream.svg")} alt="Mediastream Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Adobe.svg")} alt="Adobe Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/NVIDIA.svg")} alt="Nvidia Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Chevron.svg")} alt="Chevron Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Accenture.svg")} alt="Accenture Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Wells_Fargo.svg")} alt="Wells Fargo Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Service_Now.svg")} alt="Service Now Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Miami_Tech_Works.svg")} alt="Miami Tech Works Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/FIU_SGA.svg")} alt="FIU SGA Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/GDG.svg")} alt="Google Developer Student Club Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/CodePath.svg")} alt="CodePath Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/MLT.svg")} alt="MLT Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/GitHub.svg")} alt="GitHub Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/emerge_logo.svg")} alt="eMerge Americas Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/GCP.svg")} alt="Google Cloud Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Jetbrains.svg")} alt="Jet Brains IDE Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/MDC_IT.svg")} alt="MDC IT Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/North_Star_Catering.svg")} alt="North Star Catering Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Snap.svg")} alt="Snap Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Cafe_Cultura.svg")} alt="Cafe Cultura Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/ETH_Miami.svg")} alt="ETH Miami Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/Chainguard.png")} alt="Chainguard Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/GeeksForGeeks.png")} alt="GeeksForGeeks Logo" className="md:col-span-4" />
          <SponsorImage src={getAssetPath("assets/sponsors/PSTC.png")} alt="PSTC Logo" className="md:col-span-4" />
        </div>
      </>
    </ExpandedSection>
  );
}

export default Sponsors;
