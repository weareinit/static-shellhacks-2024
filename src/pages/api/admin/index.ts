import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "src/util/auth0Utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send("User has admin privileges");
  const admin = await isAdmin(req, res);

  if (!admin) {
    res.status(403).json({ error: "Forbidden" });
  }
};

export default withApiAuthRequired(handler);
