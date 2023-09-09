import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  const isAdmin = session?.user?.["https://shellhacks.net/roles"]?.includes("admin");
  return isAdmin;
};

export const isGUI = async (req: NextApiRequest, res: NextApiResponse) => {
  return req.headers.authorization === process.env.GUI_SECRET;
};
