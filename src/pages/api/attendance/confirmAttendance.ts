import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { isAdmin } from "src/util/auth0Utils";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  if (req.method == "PUT") {
    try {
      const { hacker_id, application_status } = req.body;

      if (application_status === "confirmed") {
        const updatedApplicant = await prisma.hacker_Applications.update({
          where: { hacker_id },
          data: { application_status },
        });

        return res.status(200).json(updatedApplicant);
      } else {
        return res.status(400).json({ error: "Invalid application status" });
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default withApiAuthRequired(handler);
