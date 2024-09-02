import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { auth } from "@/server/auth";

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });

export const getAllEvents = async () => {
  const session = await auth();

  if (!session || !session.user.admin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_EVENTS_DB ?? "",
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
