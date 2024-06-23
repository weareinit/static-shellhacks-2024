import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";

const INIT_DISCORD_ID = "245393533391863808";
//maybe we want to update this with a specific 'shellhacks-only' role in the future
const INIT_EBOARD_ROLE = "1061212827785900103";
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
      discordUsername: string;
      hacker_id?: number; // if the user has registered for the hackathon
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    admin: boolean;
    discordUsername: string;
    hacker_id?: number;
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
      authorization: `https://discord.com/oauth2/authorize?client_id=${env.DISCORD_CLIENT_ID}&scope=identify+guilds.join+guilds.members.read`,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      console.log("session", session);
      console.log("user", user);

      session.user.id = user.id;
      session.user.email = user.email;
      session.user.admin = user.admin;
      session.user.discordUsername = user.discordUsername;

      try {
        //Add the hackerId field to the session
        const hackerId = await db.hacker_Applications.findUnique({
          where: { userId: user.id },
          select: { id: true },
        });

        user.hacker_id = hackerId?.id;
        session.user.hacker_id = user.hacker_id;
      } catch (error) {
        console.error("Error getting user registration status", error);
      }

      return session;
    },
    signIn: async ({ user, account }) => {
      console.log("Authorization URL:", account?.access_token); // Add this line

      if (!account) return false;

      const access_token = account.access_token;
      const response = await fetch(
        `https://discord.com/api/users/@me/guilds/${INIT_DISCORD_ID}/member`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          // User not on server -> refetch for their info
          const userInfoResponse = await fetch(
            `https://discord.com/api/users//@me`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!userInfoResponse.ok) {
            const errorText = await userInfoResponse.text();
            console.error(
              "Error fetching user info",
              userInfoResponse.status,
              errorText,
            );
            return false;
          } else {
            const json = await userInfoResponse.json();
            user.admin = false;
            user.discordUsername = json.username;
          }
        } else {
          const errorText = await response.text();
          console.error(
            "Error fetching user roles",
            response.status,
            errorText,
          );
          return false;
        }
      } else {
        const json = await response.json();
        const roles = new Set(json.roles ?? []);
        user.admin = roles.has(INIT_EBOARD_ROLE);
        user.discordUsername = json.user?.username;
      }

      try {
        await db.user.update({
          where: { id: user.id },
          data: { admin: user.admin },
        });
      } catch (error) {
        console.info(
          "Error updating user admin role. This could be because the account isn't yet created",
          error,
        );
      }

      return true;
    },
  },
});
