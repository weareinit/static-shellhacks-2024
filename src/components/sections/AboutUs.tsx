import React from "react";
import Image from "next/image";

import FillImage from "../FillImage";

function AboutUs() {
  return (
    <section className="m-2 p-4 h-fit min-w-[350px] w-[70vw] max-w-[900px] pt-16" id="about">
      <h1 className="my-4 font-console text-crate_brown text-4xl mb-2 text-center">About Us</h1>
      <div className="flex flex-col lg:flex-row justify-center items-stretch w-full gap-x-2">
        <div className="relative flex-1 min-w-[300px] min-h-[200px] w-full mb-2">
          <Image src="/images/hackers_pic.jpg" alt="Hackers at ShellHacks 2022" fill className="object-cover h-full" />
        </div>
        <article className="flex flex-1 flex-col justify-center text-sm w-full ">
          <div className="bg-navbar_background bg-caramel_brown p-6 rounded-sm text-crate_brown h-full">
            <p className="font-pixel mb-2">
              Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come
              together to:
            </p>
            <ul className="list-disc ml-6 mb-2 font-pixel">
              <li>Learn the latest technologies</li>
              <li>Develop innovative projects</li>
              <li>Network with top companies, and more!</li>
            </ul>
            <p className="">
              Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our
              career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AboutUs;
