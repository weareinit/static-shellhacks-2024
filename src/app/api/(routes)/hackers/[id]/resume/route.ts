import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { validateCaptcha } from "@/app/util/captcha";
import { generateSignedResumeUploadUrl, generateSignedResumeUrl, uploadResume } from "@/app/util/aws";
import { auth } from "@/server/auth";

/*
 * Return a signed URL so the hacker (or an admin on behalf of) can view their resume
 */
export const GET = auth(async (request, ctx) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!ctx.params?.id) {
    return new NextResponse("No id provided", { status: 400 });
  }

  const id = parseInt(ctx.params.id as string);

  const resume = await db.hacker_Applications.findUnique({
    where: {
      id: request.auth.user.admin ? id : request.auth.user.hacker_id,
    },
    select: {
      resume_path: true,
    },
  });

  if (!resume) {
    return new NextResponse("Applicant not found", { status: 404 });
  }

  const signedUrl = await generateSignedResumeUrl(resume.resume_path);
  return NextResponse.redirect(signedUrl);
});

/*
 * Return a signed URL so the hacker (or an admin on behalf of) can update their resume
 */
export const PUT = auth(async (request, ctx) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!ctx.params?.id) {
    return new NextResponse("No id provided", { status: 400 });
  }

  const id = parseInt(ctx.params.id as string);

  const resume = await db.hacker_Applications.findUnique({
    where: {
      id: request.auth.user.admin ? id : request.auth.user.hacker_id,
    },
    select: {
      resume_path: true,
    },
  });

  if (!resume) {
    return new NextResponse("Applicant not found", { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("resume");

  if (!file || !(file instanceof File)) {
    return new NextResponse("No file provided or invalid file", {
      status: 400,
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    await uploadResume(resume.resume_path, buffer);
  } catch (e) {
    return new NextResponse("AWS Error" + e, { status: 500 });
  }
  return new NextResponse("Resume uploaded", { status: 200 });
});
