import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function validateCaptcha(req: NextApiRequest, res: NextApiResponse) {
  const { recaptcha } = req.body;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${recaptcha}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    method: "POST",
  });

  if (!response.ok) {
    return res.status(400).json({ message: "Failed to make Captcha validation" });
  }

  const captchaData = await response.json();
  if (!captchaData.success) {
    return res.status(400).json({ message: "Captcha validation failed" });
  }
}
