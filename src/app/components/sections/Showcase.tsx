import Image from "next/image";
import { ReactNode } from "react";

function Showcase({ alt, src, heading, children }: { alt: string; src: string; heading: string; children?: ReactNode | ReactNode[] }) {
  return (
    <section className="flex flex-col md:flex-row mt-36 justify-center items-center">
      <div className="relative text-center h-[300px] w-4/5">
        <h1 className="w-full text-center absolute top-6 font-console uppercase text-4xl text-crate_brown">{heading}</h1>
        <Image src={src} alt={alt} fill className="object-fill" />
      </div>
      <article className="p-4 font-pixel bg-caramel_brown text-crate_brown max-w-[350px]">{children}</article>
    </section>
  );
}

export default Showcase;
