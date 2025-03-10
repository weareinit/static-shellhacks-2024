import React from "react";
import Image from "next/image";
import Button from "../input/Button";
import NoticeBox from "../NoticeBox";
import { NoticeStyles } from "../NoticeBox";
import { getAssetPath } from "@/app/util/getAssetPath";

export default function NetworkCallout() {
  return (
    <section className="m-2 h-fit p-4 pt-16" id="about">
      <h1 className="font-console text-crate_brown mb-6 text-center text-4xl">
        <span className="text-deep_blue">Network:</span> Career Fair
      </h1>
      <div className="flex w-full flex-col items-stretch justify-center gap-x-4 gap-y-4 lg:flex-row">
        <NoticeBox className="text-clamp-sm h-fill flex-1" color={NoticeStyles.Blue}>
          <>
            <p>
              Looking for your next internship or job opportunity? Our career fair is the perfect place for you to connect with recruiters and professionals from leading tech companies! You'll have
              the chance to learn about each company's culture, interview process, and open internship and job opportunities.
            </p>
            <br />
            <p>
              This is your chance to make connections and land interviews early in the recruiting season. Make sure to bring your resume, enthusiasm, and curiosity as you explore the diverse
              opportunities available at the career fair. For a full list of companies attending the career fair, be sure to check out the Hacker Guide on your Dashboard!
            </p>
          </>
        </NoticeBox>
        <div className="relative aspect-[4/3] w-full flex-1">
          <Image src={getAssetPath("images/networking.jpg")} alt="Hackers at ShellHacks 2022" fill className="h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
