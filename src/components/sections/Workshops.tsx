import React from "react";
import Image from "next/image";

function WorkshopItem({ src, heading, text }: { src: string; heading: string; text: string }) {
  return (
    <div className="flex">
      <div className=" bg-caramel_brown w-32 h-32 relative">
        <Image src={src} alt="" fill className=" object-contain p-2" />
      </div>
      <article className="max-w-[300px] p-4">
        <h2 className="text-crate_brown font-pixel text-2xl">{heading}</h2>
        <p className="text-dark_brown font-pixel">{text}</p>
      </article>
    </div>
  );
}

function Workshops() {
  return (
    <section className="mt-36">
      <h1 className="text-4xl text-crate_brown font-console text-center mb-12">Workshops</h1>
      <div className="grid grid-cols-1 justify-items-center space-y-12">
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Web Development" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Game Development" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Hardware" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Design / Product" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Mobile Development" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="AI / Machine Learning" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="IT / Cybersecurity" text="Learn how to design websites using the latest tech and frameworks." />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Career Development" text="Learn how to design websites using the latest tech and frameworks." />
      </div>
    </section>
  );
}

export default Workshops;
