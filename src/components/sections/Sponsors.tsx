import Image from "next/image";

function SponsorImage({ className, src, alt }: { className?: string; src: string; alt: string }) {
  return (
    <div className={`min-w-[200px] min-h-[150px] w-full relative ${className}`}>
      <Image src={src} alt={alt} className=" object-contain p-5" fill />
    </div>
  );
}

function Sponsors() {
  return (
    <section className=" m-4 p-4 mt-36 min-w-[300px] w-[70vw] max-w-[1200px]">
      <h1 className=" text-4xl text-crate_brown text-center ">Sponsors</h1>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
        <SponsorImage src="/assets/sponsors/INIT FIU.svg" alt="INIT FIU's Logo" className="col-span-2 md:col-span-12" />
        <SponsorImage src="/assets/sponsors/Microsoft.svg" alt="Microsoft Logo" className="col-span-2 md:col-span-12" />
        <SponsorImage src="/assets/sponsors/Xbox.svg" alt="Xbox Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Google.svg" alt="Google Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Waymo.svg" alt="Waymo Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Cutting Edge AI.svg" alt="Cutting Edge AI Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Lexis Nexis.svg" alt="Lexis Nexis Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/HPCC Systems.svg" alt="HPCC Systems Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Southwest.svg" alt="Southwest Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Addigy.svg" alt="Addigy Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Mediastream.svg" alt="Mediastream Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Adobe.svg" alt="Adobe Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/nvidia.svg" alt="Nvidia Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/FIU SGA.svg" alt="FIU SGA Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/GitHub.svg" alt="GitHub Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/eMerge.svg" alt="eMerge Americas Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/GCP.svg" alt="Google Cloud Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/GDG.svg" alt="Google Developer Student Club Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/Jetbrains.svg" alt="Jet Brains IDE Logo" className="md:col-span-4" />
      </div>
    </section>
  );
}

export default Sponsors;
