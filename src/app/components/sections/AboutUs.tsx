import React from "react";
import Image from "next/image";
import FillImage from "../FillImage";
import { getAssetPath } from "@/app/util/getAssetPath";

function AboutUs() {
  return (
    <section className="m-2 h-fit p-4 pt-16" id="about">
      <h1 className="font-console text-crate_brown mb-6 text-center text-4xl">About Us</h1>
      <div className="flex w-full flex-col items-stretch justify-center gap-x-4 gap-y-4 lg:flex-row">
        <div className="relative aspect-[4/3] w-full flex-1">
          <Image src={getAssetPath("images/hackers_pic.jpg")} alt="Hackers at ShellHacks 2022" fill className="h-full object-cover" />
        </div>
        <article className="text-clamp-sm h-fill flex flex-1 flex-col justify-center ">
          <div className="bg-navbar_background bg-caramel_brown text-crate_brown h-full rounded-sm p-6">
            <p className="font-pixel mb-2">
              Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come
              together to:
            </p>
            <ul className="font-pixel mb-2 ml-6 list-disc">
              <li className="text-cyan_blue">Build: Develop innovative projects</li>
              <li className="text-deep_blue">Network: Network with top companies, and more!</li>
              <li className="text-pink">Learn: Learn the latest technologies</li>
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
