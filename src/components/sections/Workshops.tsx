import React from "react";
import Image from "next/image";

function WorkshopItem({ src, heading, text }: { src: string; heading: string; text: string }) {
  return (
    <div className="flex">
      <Image src={src} alt="" className=" p-2 bg-caramel_brown bg-fixed" width={128} height={128} />
      <article className="max-w-[300px] p-4">
        <h2 className="text-crate_brown font-pixel text-xl lg:text-2xl">{heading}</h2>
        <p className="text-dark_brown font-pixel text-sm">{text}</p>
      </article>
    </div>
  );
}

function Workshops() {
  return (
    <section className="mt-36 mx-2">
      <h1 className="text-4xl text-crate_brown font-console text-center mb-12">Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center space-y-12 md:space-y-0 md:gap-8">
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Web Development" text="Develop web applications using the latest frameworks and tools" />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Game Development" text="Create virtual experiences that bring worlds and characters to life" />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Hardware" text="Use computer hardware to tackle and solve real-world problems" />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Design / Product" text="Create intuitive user experiences for your web or mobile applications" />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Mobile Development" text="Build interactive mobile applications for iOS and Android platforms" />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="AI / Machine Learning" text="Implement AI/ML algorithms to automate tasks and make predictions" />
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="IT / Cybersecurity" text="Dive into the world of cloud computing, cybersecurity, and hacking" />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Career Development" text="Explore careers in technology and how to break into the industry" />
      </div>
    </section>
  );
}

export default Workshops;
