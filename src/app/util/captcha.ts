/*
 * Helper function to validate the captcha from the client
 * @param request - the request object
 * @returns a response object
 */
export async function validateCaptcha(body: any) {
  const { recaptcha } = body;

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
    throw new Error("Failed to fetch captcha verification data");
  }

  const captchaData = await response.json();
  if (!captchaData.success) {
    throw new Error("Invalid captcha");
  }
}
