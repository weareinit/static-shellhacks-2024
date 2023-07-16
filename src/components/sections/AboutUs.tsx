import React from "react";

import FillImage from "../FillImage";

function AboutUsImages() {
  return (
    <div className="relative w-[300px] h-[300px]">
      <div className="absolute w-fit top-0 left-0 hover:z-10">
        <FillImage src="/assets/cup_stack.jpeg" alt="Hackathon participants in last year's shellhacks" className=" w-52 h-52 rounded-pixel" />
      </div>
      <div className="absolute w-fit bottom-0 right-0 hover:z-10">
        <FillImage src="/assets/init_eboard_mem.jpeg" alt="Vincent Carrancho, a ShellHacks organizer, holding up a ShellHacks 2022 sign" className="w-52 h-52 rounded-pixel" />
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <section className="flex flex-col lg:flex-row max-w-[600px] lg:max-w-[900px] m-2 p-4 lg:space-x-8 space-y-4 h-fit">
      <div className="flex justify-center items-center w-full lg:w-2/5 p-5">
        <AboutUsImages />
      </div>
      <article className="flex flex-col justify-center w-full lg:w-3/5">
        <h1 className="font-console text-crate_brown text-4xl lg:text-6xl mb-2 text-center">About Us</h1>
        <div className="bg-navbar_background p-6 rounded">
          <p className="font-inter text-lg lg:text-xl mb-2">
            Ready to kickstart your career in tech? Join us for Florida's Largest Hackathon! 1,000+ students from around the world will come together to:{" "}
          </p>
          <ul className="list-disc ml-6 mb-2 font-inter text-lg lg:text-xl">
            <li>Learn the latest technologies</li>
            <li>Develop innovative solutions</li>
            <li>Network with top companies, and more!</li>
          </ul>
          <p className="text-lg lg:text-xl">
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
