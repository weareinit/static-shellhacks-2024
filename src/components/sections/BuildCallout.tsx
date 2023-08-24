import Image from "next/image";
import Link from "next/link";

import React from "react";
import NoticeBox, { NoticeStyles } from "../NoticeBox";
import Button from "../input/Button";

export default function BuildCallout() {
  return (
    <section className="pt-36 flex flex-col mx-2 p-4">
      <h1 className="text-4xl text-crate_brown text-center mb-6">
        <span className="text-cyan_blue">Build:</span> Projects
      </h1>
      <NoticeBox className="w-full clamp-text-sm mb-4" color={NoticeStyles.Cyan}>
        <>
          <p>
            Get ready to unleash your creativity! At ShellHacks, you'll have access to a range of tools, resources, and mentors to help you develop and refine your project. You'll be able to
            collaborate with other students and learn new skills as you work towards a shared goal.
          </p>
          <br />
          <p>
            Build your project using any technology you like! Whether you're interested in web development, AI/ML, hardware, or anything in between, there’s always something to create. You can also
            build a project to tackle a sponsor “challenge” which is aligned with a specific technology or theme. As you work hard, you'll have the opportunity to showcase your creativity,
            problem-solving skills, and technical knowledge to top companies looking to hire talented students!
          </p>
        </>
      </NoticeBox>
      <div className="flex flex-col-reverse gap-y-2 lg:flex-row gap-x-4">
        <div className="relative aspect-[12/9] lg:w-1/2 w-full">
          <Image src="/images/hackers_pic_3.jpg" alt="Picture of Hackers surrounding a table" fill className="object-cover h-full" />
        </div>
        <div className="hidden lg:block relative aspect-[12/9] lg:w-1/2 w-full">
          <Image src="/images/hackers_pic_2.jpg" alt="Picture of Hackers surrounding a table" fill className="object-cover h-full" />
        </div>
      </div>
      <Link
        target="_blank"
        className="bg-cyan_blue text-white my-4 drop-shadow-light_blue text-center py-3 px-3 font-pixel sm:text-lg no-underline hover:underline"
        href="https://shellhacks2022.devpost.com/project-gallery"
      >
        Check Out Past Challenges + Projects!
      </Link>
    </section>
  );
}
