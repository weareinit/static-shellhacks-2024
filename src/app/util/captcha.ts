import { NextRequest, NextResponse } from "next/server";

/*
 * Helper function to validate the captcha from the client
 * @param request - the request object
 * @returns a response object
 */
export async function validateCaptcha(request: NextRequest) {
  const { recaptcha } = await request.json();

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.PRIVATE_RECAPTCHA_KEY}&response=${recaptcha}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      method: "POST",
    },
  );

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to make Captcha validation" });
  }

  const captchaData = await response.json();
  if (!captchaData.success) {
    return NextResponse.json({ message: "Captcha validation failed" });
  }
}
