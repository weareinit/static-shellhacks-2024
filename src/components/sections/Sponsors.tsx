import Image from "next/image";

function SponsorImage({ className, src, alt }: { className?: string; src: string; alt: string }) {
  return (
    <div className={`min-w-[200px] min-h-[150px] w-full relative ${className}`}>
      <Image src={src} alt={alt} className=" object-cover p-5" fill />
    </div>
  );
}

function Sponsors() {
  return (
    <section className=" m-4 p-4 mt-36">
      <h1 className=" text-4xl text-crate_brown text-center ">Sponsors</h1>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="col-span-2 md:col-span-12" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-6" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-6" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-6" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-6" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
        <SponsorImage src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" className="md:col-span-4" />
      </div>
    </section>
  );
}

export default Sponsors;
