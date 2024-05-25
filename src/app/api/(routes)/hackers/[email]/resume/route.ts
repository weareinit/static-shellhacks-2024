import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { validateCaptcha } from "@/app/util/captcha";
import {
  generateSignedResumeUploadUrl,
  generateSignedResumeUrl,
} from "@/app/util/aws";

/*
 * Return a signed URL so the hacker (or an admin on behalf of) can view their resume
 */
export async function GET(
  request: NextRequest, //only including the request so next doens't cache it
  { params }: { params: { email: string } },
) {
  const resume = await db.hacker_Applications.findUnique({
    where: {
      email: params.email,
    },
    select: {
      resume_path: true,
    },
  });

  if (!resume) {
    return new NextResponse("Applicant not found", { status: 404 });
  }

  const signedUrl = await generateSignedResumeUrl(resume.resume_path);

  return NextResponse.json({ url: signedUrl });
}

/*
 * Return a signed URL so the hacker (or an admin on behalf of) can update their resume
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    await validateCaptcha(request);
  } catch (e) {
    return new NextResponse("Invalid captcha", { status: 400 });
  }

  const resume = await db.hacker_Applications.findUnique({
    where: {
      email: params.email,
    },
    select: {
      resume_path: true,
    },
  });

  if (!resume) {
    return new NextResponse("Applicant not found", { status: 404 });
  }

  const signedUrl = await generateSignedResumeUploadUrl(resume.resume_path);

  return NextResponse.json({ url: signedUrl });
}
