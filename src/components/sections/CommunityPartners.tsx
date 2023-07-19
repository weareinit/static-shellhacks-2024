import Image from "next/image";

import { SponsorImage } from "./Sponsors";

function CommunityPartners() {
  return (
    <section className=" m-4 p-4 mt-36 min-w-[200px] w-[70vw] max-w-[1200px] flex flex-col justify-center items-center">
      <h1 className=" text-4xl text-crate_brown text-center ">Community Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
        <SponsorImage src="/assets/sponsors/INIT.svg" alt="INIT Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/KF.svg" alt="Knight Foundation Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Lab22c.svg" alt="Xbox Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_CEC.svg" alt="Google Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_KFSCIS.svg" alt="Waymo Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MDC.svg" alt="Cutting Edge AI Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU_Honors.svg" alt="Lexis Nexis Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/MLH.svg" alt="HPCC Systems Logo" className="md:col-span-4" />
      </div>
    </section>
  );
}

export default CommunityPartners;
