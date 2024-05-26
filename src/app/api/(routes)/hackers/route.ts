import { NextRequest, NextResponse } from "next/server";
import { newApplicantSchema } from "@/app/schemas/applicantSchemas";
import { db } from "@/server/db";
import { validateCaptcha } from "@/app/util/captcha";
import { randomBytes } from "crypto";
import {
  generateSignedResumeUploadUrl,
  sendConfirmationEmail,
} from "@/app/util/aws";
import { Prisma } from "@prisma/client";
import { auth } from "@/server/auth";

export const POST = auth(async (request) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await validateCaptcha(request);
  const body = await request.json();

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user

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

    await sendConfirmationEmail(
      validatedApplicant.email,
      validatedApplicant.first_name,
    );
  } catch (e) {
    console.log("Error occured!", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        NextResponse.json({
          error: "Duplicate. User already exists with that email / id.",
        });
      }
    }
    return NextResponse.json({
      error:
        "Internal Error. Could not create applicant and send confirmation email.",
    });
  }

  const url = await generateSignedResumeUploadUrl(resumeId);

  return NextResponse.json({ resume_url: url });
});
