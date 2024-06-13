import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      admin: boolean;
      email: string;
      discordId: string;
      isRegistered: boolean; // if the user has registered for the hackathon
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    admin: boolean;
    discordId: string;
    isRegistered: boolean;
    // ...other properties
    // role: UserRole;
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  // @ts-expect-error
  // see: https://github.com/nextauthjs/next-auth/issues/9493
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      session.user.email = user.email;
      session.user.admin = user.admin;
      session.user.discordId = user.discordId;

      try {
        //Add the isRegistered field to the session
        const isRegistered = await db.hacker_Applications.findUnique({
          where: { userId: user.id },
        });

        console.log("isRegistered", isRegistered);
        user.isRegistered = !!isRegistered;
        session.user.isRegistered = user.isRegistered;
      } catch (error) {
        console.error("Error getting user registration status", error);
      }

      return session;
    },
    signIn: async ({ user, account }) => {
      // if (!account) return false;
      const access_token = account?.access_token;
      const data = await fetch(
        "https://discord.com/api/users/@me/guilds/245393533391863808/member",
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
        },
      );

      if (!data.ok) {
        console.error("Error fetching user roles", data);
        return false;
      }

      const json = await data.json();

      console.log("json", json);

      const roles = new Set(json.roles ?? []);

      const ADMIN_ROLE = "1061212827785900103"; // fake btw

      user.admin = roles.has(ADMIN_ROLE);
      user.discordId = json.user?.id;

      try {
        //Update the admin role for the user
        await db.user.update({
          where: { id: user.id },
          data: {
            admin: user.admin,
          },
        });
      } catch (error) {
        console.error(
          "Error updating user admin role. This could be because the account isn't yet created",
          error,
        );
      }

      console.log("user", user);
      return true;
    },
  },
});
