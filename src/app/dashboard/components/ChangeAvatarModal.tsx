"use client";

import { dinosaurNames } from "@/app/constants/dinosaurNames";
import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { getAssetPath } from "@/app/util/getAssetPath";

export default function ChangeAvatarModal({ isOpen, toggleOpen, handleDinoChange }: { isOpen: boolean; toggleOpen: () => void; handleDinoChange: (dino: number) => void }) {
  return isOpen
    ? createPortal(
        <div className="fixed inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-80">
          <div className="min-h-screen overflow-y-scroll bg-white p-3 pb-8 pt-8 md:min-h-0 md:w-[90%] md:rounded-lg md:p-5">
            <div className="flex flex-row items-center justify-between">
              <h1 className="mt-2 font-zoonaji text-2xl font-bold">Change Avatar</h1>
              <button onClick={toggleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className=" size-8 text-red-600 hover:text-red-800">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-3 md:justify-start md:gap-8">
              {dinosaurNames.map((dino, index) => (
                <Image
                  src={getAssetPath(`assets/new/dinosaurs/${dino}.svg`)}
                  width={110}
                  height={110}
                  key={dino}
                  alt={dino}
                  className="cursor-pointer border-green-600 p-2 hover:border-2"
                  onClick={() => handleDinoChange(index)}
                />
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
