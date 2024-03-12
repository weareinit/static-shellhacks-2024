import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function getHackerApplication() {
  const session = await getServerAuthSession();

  const userId = session?.user.id;

  const data = await db.hacker_Applications.findUnique({
    where: {
      userId, // Linking the user ID with the hacker application
    },
  });

  return data;
};
