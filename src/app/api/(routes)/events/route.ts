import { Client } from "@notionhq/client";
import { env } from "@/env";
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { getAllEvents } from "../../(logic)/getAllEvents";

export const dynamic = "auto"; //cache
export const revalidate = 60; //cache

export const GET = auth(async (request, { params }) => {
  if (!request.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await getAllEvents();
});
