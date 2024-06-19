"use client";
import { uploadResume } from "@/app/util/uploadResume";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import Link from "next/link";

export default function ResumeView({ hackerId }: { hackerId: number }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const handleResumeFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setIsUploadingResume(true);
      await uploadResume(file, hackerId);
      setIsUploadingResume(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="font-museo text-xl">Your Resume:</p>
      <div className="flex flex-col gap-2">
        <Link href={`/api/hackers/${userId}/resume`} target="_blank">
          <CustomButton colorVariant={2}>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
              </svg>

              <span className="mt-1">Open Resume</span>
            </div>
          </CustomButton>
        </Link>
        <div>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleResumeFileChange}
            accept="application/pdf"
          />
          <CustomButton
            onClick={() => fileInputRef.current?.click()}
            colorVariant={2}
          >
            {isUploadingResume ? (
              "Uploading..."
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                </svg>

                <span className="mt-1">Upload Another</span>
              </div>
            )}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
