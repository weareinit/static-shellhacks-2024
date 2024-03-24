import { getServerAuthSession } from "@/server/auth";

export const isAdmin = async () => {
  const user = await getServerAuthSession();
  return user?.user.admin;
};