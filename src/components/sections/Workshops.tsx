import React from "react";
import Image from "next/image";
import NoticeBox, { NoticeStyles} from "../NoticeBox";

function WorkshopItem({ src, heading, text }: { src: string; heading: string; text: string }) {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row">
      <div className="aspect-square w-[200px]">
        <Image src={src} alt="" width = {0} height = {0} className="w-full p-5"/>
      </div>
      <article className="max-w-[300px] p-4">
        <h2 className="text-crate_brown font-pixel text-xl lg:text-2xl">{heading}</h2>
        <p className="text-dark_brown font-pixel text-sm">{text}</p>
      </article>
    </div>
  );
}

function Workshops() {
  return (
    <section className="pt-36 mx-2" id="workshops">
      <h1 className="text-4xl text-crate_brown font-console text-center mb-6"><span className="text-pink">Learn: </span>Workshops</h1>
      <NoticeBox color = {NoticeStyles.Pink} className = "mb-2 clamp-text-sm"><p>ShellHacks offers a variet of workshop tracks to introduce you to the world of technology and careers in the field! These workshops are beginner friendly and open to all.</p></NoticeBox>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center space-y-12 md:space-y-0 md:gap-8 auto-rows-fr">
        <WorkshopItem src="/assets/decorations/pink_umbrella.svg" heading="Web Development" text="Develop web applications using the latest frameworks and tools" />
        <WorkshopItem src="/assets/decorations/turtle.png" heading="Game Development" text="Create virtual experiences that bring worlds and characters to life" />
        <WorkshopItem src="/assets/decorations/dolphin.png" heading="Hardware" text="Use computer hardware to tackle and solve real-world problems" />
        <WorkshopItem src="/assets/decorations/papaya.png" heading="Design / Product" text="Create intuitive user experiences for your web or mobile applications" />
        <WorkshopItem src="/assets/decorations/coconut.png" heading="Mobile Development" text="Build interactive mobile applications for iOS and Android platforms" />
        <WorkshopItem src="/assets/decorations/coral.png" heading="AI / Machine Learning" text="Implement AI/ML algorithms to automate tasks and make predictions" />
        <WorkshopItem src="/assets/decorations/flamingo.png" heading="IT / Cybersecurity" text="Dive into the world of cloud computing, cybersecurity, and hacking" />
        <WorkshopItem src="/assets/decorations/teal_umbrella.svg" heading="Career Development" text="Explore careers in technology and how to break into the industry" />
      </div>
    </section>
  );
}

export default Workshops;
