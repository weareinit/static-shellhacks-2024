import { NextRequest, NextResponse } from "next/server";
import { newApplicantSchema } from "@/app/schemas/applicantSchemas";
import { db } from "@/server/db";
import { validateCaptcha } from "@/app/util/captcha";
import { randomBytes } from "crypto";
import {
  generateSignedResumeUploadUrl,
  sendConfirmationEmail,
  uploadResume,
} from "@/app/util/aws";
import { Prisma } from "@prisma/client";
import { auth } from "@/server/auth";
import crypto from "crypto";

export const POST = auth(async (request) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const body = JSON.parse(
    formData.get("json_application") as unknown as string,
  );

  try {
    await validateCaptcha(body);
  } catch (e) {
    return new NextResponse("Invalid captcha", { status: 400 });
  }

  //Handle uploading the resume
  const resume = formData.get("resume") as File;
  if (!resume) {
    return new NextResponse("No resume provided", { status: 400 });
  }

  const resumeId = crypto.randomBytes(16).toString("hex");

  try {
    const arrayBuffer = await resume.arrayBuffer();
    const resumeBuffer = Buffer.from(arrayBuffer);
    await uploadResume(resumeId, resumeBuffer);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error uploading resume", { status: 500 });
  }

  const safedata = newApplicantSchema.safeParse({
    resume_path: resumeId,
    userId: request.auth.user.id,
    ...body,
  });

  if (!safedata.success) {
    return NextResponse.json({ error: safedata.error.message });
  }

  const validatedApplicant = safedata.data;

  try {
    await db.hacker_Applications.create({
      data: validatedApplicant,
    });

    await sendConfirmationEmail(validatedApplicant.email);
  } catch (e) {
    console.log("Error occured!", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          {
            error: "Duplicate. User already exists with that email / id.",
          },
          { status: 400 },
        );
      }
    }
    return NextResponse.json(
      {
        error:
          "Internal Error. Could not create applicant and send confirmation email.",
      },
      { status: 500 },
    );
  }

  return new NextResponse("Application created successfully", { status: 200 });
});
