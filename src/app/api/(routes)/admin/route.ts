import { NextResponse } from "next/server";
import {auth} from "@/server/auth";

export const GET = auth((req) => {
  if (!req.auth || !req.auth.user.admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ message: "Hello World", auth: req.auth})
})
