import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerAuthSession();
  const email = session?.user.email;

  const data = await db.hacker_Applications.findUnique({
    where: {
      email
    },
  });
  
  return NextResponse.json(data);
}
