import React from "react";
import Image from "next/image";

import FillImage from "../FillImage";

function AboutUs() {
  return (
    <section className="flex items-center justify-center flex-col md:flex-row m-2 p-4 lg:space-x-8 space-y-4 h-fit min-w[300px] w-[70vw] max-w-[900px]">
      <div className="relative min-w-[300px] min-h-[200px] w-full">
        <Image src="/images/hackers_pic.jpg" alt="Hackers at ShellHacks 2022" fill className="object-cover" />
      </div>
      <article className="flex flex-col justify-center text-sm min-w-[350px]">
        <h1 className="my-4 font-console text-crate_brown text-4xl mb-2 text-center">About Us</h1>
        <div className="bg-navbar_background bg-caramel_brown p-4 rounded-sm text-crate_brown">
          <p className="font-pixel mb-2 text-xs">Ready to kickstart your career in tech? Join us for Florida's Largest Hackathon! 1,000+ students from around the world will come together to: </p>
          <ul className="list-disc ml-6 mb-2 font-pixel text-xs">
            <li>Learn the latest technologies</li>
            <li>Develop innovative solutions</li>
            <li>Network with top companies, and more!</li>
          </ul>
          <p className="text-xs">
            Explore the world of technology through our workshop tracks. Work together with fellow students and mentors to <span className="font-extrabold inline-block">build exciting projects</span>.
            Meet recruiters and <span className="font-extrabold inline-block">land internships</span> and job opportunities. <span className="font-extrabold inline-block">Win amazing prizes</span>,
            get tons of cool swag, and more - all at ShellHacks!
          </p>
        </div>
      </article>
    </section>
  );
}

export default AboutUs;
