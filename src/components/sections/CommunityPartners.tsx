import ExpandedSection from "../ExpandedSection";

import { SponsorImage } from "./Sponsors";

function CommunityPartners() {
  return (
    <ExpandedSection className=" m-4 p-4 pt-36 flex flex-col justify-center items-center">
      <>
      <h1 className=" text-4xl text-crate_brown text-center ">Community Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
        <SponsorImage src="/assets/sponsors/INIT.svg" alt="INIT Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/KF.svg" alt="Knight Foundation Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Lab22c.svg" alt="Lab22C Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Venture_Miami.svg" alt="Venture Miami Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_OOP.svg" alt="FIU OOP Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_CEC.svg" alt="FIU College of Engineering and Computing Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_KFSCIS.svg" alt="FIU Knight Foundation School of Computing and Information Sciences Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_Honors.svg" alt="FIU Honors College Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MDC.svg" alt="Miami Dade College Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Refresh_Miami.svg" alt="Refresh Miami Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MakeItMVP.svg" alt="MakeItMVP Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Acendi.svg" alt="Acendi Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/WiCS.svg" alt="WiCS Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/GDSCs.svg" alt="GDSCs Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/KnightHacks.svg" alt="KnightHacks Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/UCF_IT.svg" alt="UCF IT Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Design__Code.svg" alt="Design Code Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Hackabull.svg" alt="Hackabull Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/SwampHacks.svg" alt="SwampHacks Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/ACM_UF.svg" alt="ACM UF Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/SEC.svg" alt="SEC Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Gator_Gaming.svg" alt="Gator Gaming Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/GatorVR.svg" alt="GatorVR Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/inTech.svg" alt="inTech Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MLH.svg" alt="Major League Hacking" className="md:col-span-4" />
      </div>
      </>
    </ExpandedSection>
  );
}

export default CommunityPartners;
