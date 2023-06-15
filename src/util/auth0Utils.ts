import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const isAdmin = session?.user?.["https://shellhacks.net/roles"]?.includes("admin");
  return isAdmin;
};
