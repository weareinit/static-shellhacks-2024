import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { validateCaptcha } from "@/app/util/captcha";
import { generateSignedResumeUploadUrl, generateSignedResumeUrl, uploadResume } from "@/app/util/aws";
import { auth } from "@/server/auth";

// Generate static params for build
export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

// Generate metadata
export function generateMetadata() {
  return {
    title: "Hacker Resume API",
  };
}

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
  try {
    if (!request.auth) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!ctx.params?.id) {
      return new NextResponse("No id provided", { status: 400 });
    }

    const id = parseInt(ctx.params.id as string);
    if (isNaN(id)) {
      return new NextResponse("Invalid id format", { status: 400 });
    }

    let resume;
    try {
      resume = await db.hacker_Applications.findUnique({
        where: {
          id: request.auth.user.admin ? id : request.auth.user.hacker_id,
        },
        select: {
          resume_path: true,
        },
      });
    } catch (dbError) {
      if (dbError instanceof Error) return new NextResponse("Database error: " + dbError.message, { status: 500 });
      return new NextResponse("Database error", { status: 500 });
    }

    if (!resume) {
      return new NextResponse("Applicant not found", { status: 404 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (formError) {
      if (formError instanceof Error) return new NextResponse("Failed to parse form data: " + formError.message, { status: 400 });
      return new NextResponse("Failed to parse form data", { status: 400 });
    }

    const file = formData.get("resume") as any; //cast to any instead of File to avoid vercel error described below

    // if (!file || !(file instanceof File)) {
    //The above line of code breaks on Vercel, "File is not defined". Probably some node version thing
    if (!file) {
      return new NextResponse("No file provided or invalid file", {
        status: 400,
      });
    }

    let arrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
    } catch (bufferError) {
      return new NextResponse("Failed to read file buffer: ", { status: 400 });
    }

    const buffer = Buffer.from(arrayBuffer);

    try {
      await uploadResume(resume.resume_path, buffer);
    } catch (uploadError) {
      if (uploadError instanceof Error) return new NextResponse("AWS Error: " + uploadError.message, { status: 500 });
      return new NextResponse("AWS Error", { status: 500 });
    }

    return new NextResponse("Resume uploaded", { status: 200 });
  } catch (error) {
    if (error instanceof Error) return new NextResponse("Unexpected error: " + error.message, { status: 500 });
    return new NextResponse("Unexpected error", { status: 500 });
  }
});
