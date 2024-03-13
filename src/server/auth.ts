import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
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
<<<<<<< HEAD
      admin: boolean;
      discordId: string;
=======
      discordID: string;
      admin: boolean;
>>>>>>> 36b072a (auth conflict)
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    admin: boolean;
    discordId: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
<<<<<<< HEAD
    signIn: async ({ user, account }) => {
      // if (!account) return false;
      const access_token = account?.access_token;
=======
    signIn: async ({ user, account, profile, email, credentials }) => {
      const access_token = account?.access_token;
      const client = new PrismaClient()
>>>>>>> 36b072a (auth conflict)
      const data = await fetch(
        "https://discord.com/api/users/@me/guilds/245393533391863808/member",
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
        },
      );
      const json = await data.json();
<<<<<<< HEAD
      const roles = new Set(json.roles ?? []);

      const ADMIN_ROLE = "1061212827785900103"; // fake btw

      user.admin = roles.has(ADMIN_ROLE);
      user.discordId = json.user.id

      console.log("USER ", user);
      
      return true;
    },
    session: async ({ session, user }) => {
=======
      const roles = new Set(json.roles ?? [])

      

      //check if the user is admin
      const ADMIN_ROLE = "1061212827785900103";
      //modify the account field to include isAdmin, this will be passsed on to the session callback
      account.is_admin = roles.has(ADMIN_ROLE)
      console.log("GUILD INFO", json);
      return true;
    },
    session: async ({ session, user, token }) => {

      //get info on guilds from the discord API
      // const data = await fetch(
      //   "https://discord.com/api/users/@me/guilds/245393533391863808/member",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${JSON.stringify(token)}`,
      //     },
      //   },
      // );

      // console.log("DATA FROM API", data);

>>>>>>> 36b072a (auth conflict)
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
<<<<<<< HEAD
          admin: session.user.admin,
          discordId: user.discordId
=======
          discordID: user.id,
          admin: session.user.admin
>>>>>>> 36b072a (auth conflict)
        },
      };
    },
  },
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
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
