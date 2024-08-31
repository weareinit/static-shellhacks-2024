"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../dashboard/components/CustomButton";
import { useZxing } from "react-zxing";
import EventsSelection from "../admin/components/EventsSelection";

const CheckIn = () => {
  const [result, setResult] = useState("");
  const [currentSelection, setCurrentSelection] = useState("Check In");
  const [checkInOptions, setCheckInOptions] = useState<Map<string, string[]>>(new Map());

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div className="w-100 bg-[#89CED8]">
      {/* The dashboard section (and image container) */}
      <div className="relative flex justify-center p-2 md:p-12">
        <div className="absolute inset-0 flex h-screen flex-col justify-center">
          <div className="relative flex-grow">
            <Image src="/assets/new/background/sky/Sky 5.svg" layout="fill" objectFit="cover" alt="Sky" className="object-cover" />
          </div>
          <div className="relative hidden h-[250px] sm:block">
            <Image src="/assets/new/background/sky/Sky.png" layout="fill" objectFit="cover" alt="Sky Continuation" className="object-cover object-bottom" />
          </div>
        </div>
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="mb-10 grid w-full grid-cols-10 items-start text-center">
            <Link href="/admin">
              <CustomButton colorVariant={1} border>
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="mr-2 h-4 w-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  <span className="mt-1">Admin</span>
                </div>
              </CustomButton>
            </Link>
            <p className="col-span-10 mt-4 font-zoonaji text-4xl text-darker_cyan sm:col-span-8 md:text-5xl lg:text-6xl">Check In</p>
          </div>
          <EventsSelection currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} checkInOptions={checkInOptions} setCheckInOptions={setCheckInOptions} />
          <video ref={ref} />
          <p>
            <span>Last result:</span>
            <span>{result}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
