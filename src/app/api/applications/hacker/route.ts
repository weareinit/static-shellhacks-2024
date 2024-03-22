import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  // const session = await getServerAuthSession();

  // const userId = session?.user.id;
  const userId = "d913b428-aead-4540-b213-c84309bc6a9c";


  const data = await db.hacker_Applications.findUnique({
    where: {
      userId, // Linking the user ID with the hacker application
    },
  });
  console.log("data", data);
  return NextResponse.json(data);
}
