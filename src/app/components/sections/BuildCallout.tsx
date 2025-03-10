import Image from "next/image";
import Link from "next/link";

import React from "react";
import NoticeBox, { NoticeStyles } from "../NoticeBox";
import Button from "../input/Button";
import { getAssetPath } from "@/app/util/getAssetPath";

export default function BuildCallout() {
  return (
    <section className="mx-2 flex flex-col p-4 pt-36">
      <h1 className="text-crate_brown mb-6 text-center text-4xl">
        <span className="text-cyan_blue">Build:</span> Projects
      </h1>
      <NoticeBox className="clamp-text-sm mb-4 w-full" color={NoticeStyles.Cyan}>
        <>
          <p>
            Get ready to unleash your creativity! At ShellHacks, you'll have access to a range of tools, resources, and mentors to help you develop and refine your project. You'll be able to
            collaborate with other students and learn new skills as you work towards a shared goal.
          </p>
          <br />
          <p>
            Build your project using any technology you like! Whether you're interested in web development, AI/ML, hardware, or anything in between, there's always something to create. You can also
            build a project to tackle a sponsor "challenge" which is aligned with a specific technology or theme. As you work hard, you'll have the opportunity to showcase your creativity,
            problem-solving skills, and technical knowledge to top companies looking to hire talented students!
          </p>
        </>
      </NoticeBox>
      <div className="flex flex-col-reverse gap-x-4 gap-y-2 lg:flex-row">
        <div className="relative aspect-[12/9] w-full lg:w-1/2">
          <Image src={getAssetPath("images/hackers_pic_3.jpg")} alt="Picture of Hackers surrounding a table" fill className="h-full object-cover" />
        </div>
        <div className="relative hidden aspect-[12/9] w-full lg:block lg:w-1/2">
          <Image src={getAssetPath("images/hackers_pic_2.jpg")} alt="Picture of Hackers surrounding a table" fill className="h-full object-cover" />
        </div>
      </div>
      <Link
        target="_blank"
        className="bg-cyan_blue drop-shadow-light_blue font-pixel my-4 px-3 py-3 text-center text-white no-underline hover:underline sm:text-lg"
        href="https://shellhacks2022.devpost.com/project-gallery"
      >
        Check Out Past Challenges + Projects!
      </Link>
    </section>
  );
}
