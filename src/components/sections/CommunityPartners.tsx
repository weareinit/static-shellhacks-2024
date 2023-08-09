import Image from "next/image";

import { SponsorImage } from "./Sponsors";

function CommunityPartners() {
  return (
    <section className=" m-4 p-4 pt-36 min-w-[200px] w-[70vw] max-w-[1200px] flex flex-col justify-center items-center">
      <h1 className=" text-4xl text-crate_brown text-center ">Community Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
        <SponsorImage src="/assets/sponsors/INIT.svg" alt="INIT Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/KF.svg" alt="Knight Foundation Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Lab22c.svg" alt="Lab22C Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Venture_Miami.svg" alt="Venture Miami Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_CEC.svg" alt="FIU College of Engineering and Computing Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_KFSCIS.svg" alt="FIU Knight Foundation School of Computing and Information Sciences Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_Honors.svg" alt="FIU Honors College Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MDC.svg" alt="Miami Dade College Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MakeItMVP.svg" alt="MakeItMVP Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MLH.svg" alt="Major League Hacking" className="md:col-span-4" />
      </div>
    </section>
  );
}

export default CommunityPartners;
