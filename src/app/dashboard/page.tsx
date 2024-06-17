"use server";
import React from "react";
import Image, { StaticImageData } from "next/image";
// import HackerGuide from "@/app/components/sections/HackerGuide";
// import { useHackerGuideContext } from "@/app/hooks/ShowHackerGuideContext";

import DahsboardContent from "./components/DashboardContent";
import Link from "next/link";
import { CustomButton } from "./components/CustomButton";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getHackerApplicationFromId } from "../api/(logic)/getUserFromId";
import { Hacker_Applications } from "@prisma/client";
import {
  dinosaurNames,
  underwaterDinosaurNames,
} from "../constants/dinosaurNames";

const Dashboard = async () => {
  const randomDino =
    underwaterDinosaurNames[
      Math.floor(Math.random() * underwaterDinosaurNames.length)
    ];
  const sess = await auth();

  if (!sess?.user) {
    redirect("/api/auth/signin");
  }

  const hackerAppRaw = await getHackerApplicationFromId(sess!.user.id);

  if (!hackerAppRaw.ok) {
    return redirect("/?show_register=true");
  }

  const application = (await hackerAppRaw.json()) as Hacker_Applications;

  return (
    <div className=" h-[250px]w-100 bg-blue-500">
      {/* The dashboard section (and image container) */}
      <div className="relative flex justify-center p-6 sm:p-12">
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="relative flex-grow">
            <Image
              src="/assets/new/background/sky/Sky 5.svg"
              layout="fill"
              objectFit="cover"
              alt="Sky"
              className="object-cover"
            />
          </div>
          <div className="relative h-[250px]">
            <Image
              src="/assets/new/background/sky/Sky.png"
              layout="fill"
              objectFit="cover"
              alt="Sky Continuation"
              className="object-cover object-bottom"
            />
          </div>
        </div>
        <div className="relative z-10  w-full">
          <div className="mb-10 grid w-full grid-cols-10 items-start text-center">
            <Link href="/">
              <CustomButton colorVariant={1} border>
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span className="mt-1">Home</span>
                </div>
              </CustomButton>
            </Link>
            <p className="col-span-10 mt-4 font-zoonaji text-4xl text-darker_cyan sm:col-span-8 md:text-5xl lg:text-6xl">
              {application.first_name}'s Hacker Dashboard
            </p>
          </div>
          <div className="w-full rounded-lg bg-white bg-opacity-50">
            <DahsboardContent application={application} />
          </div>
        </div>
      </div>
      <div className="relative hidden sm:block">
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src="/assets/new/background/beach/Ocean 5.svg"
            layout="fill"
            objectFit="cover"
            alt="Beach"
            className="object-cover"
          />
          <div className="absolute left-[150px] top-1/4 max-w-full">
            <Image
              src={`/assets/new/dinosaurs/${randomDino}.svg`}
              height={100}
              width={200}
              alt="Dino"
              className="overflow-hidden opacity-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
