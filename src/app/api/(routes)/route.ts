import { NextResponse } from "next/server";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

export async function GET({ params }: { params: { email: string } }) {
 return NextResponse.json("Hello World")
}

