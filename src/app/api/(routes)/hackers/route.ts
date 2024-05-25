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

export async function POST(request: NextRequest) {
  await validateCaptcha(request);
  const body = await request.json();

  const resumeId = randomBytes(16).toString("hex"); //generate unique resume name for each user

  const safedata = newApplicantSchema.safeParse({
    resume_path: resumeId,
    ...body,
  });

  if (!safedata.success) {
    return NextResponse.json({ error: safedata.error.message });
  }

  const validatedApplicant = safedata.data;

  //there's no unique constraint on case insensitive emails, so we have to check manually
  const existingApplicant = await db.hacker_Applications.findFirst({
    where: {
      email: {
        equals: validatedApplicant.email,
        mode: "insensitive",
      },
    },
  });

  if (existingApplicant) {
    return NextResponse.json({
      error: "Duplicate. User already exists with that email.",
    });
  }

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
          error: "Duplicate. User already exists with that email.",
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
}
