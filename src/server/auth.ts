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
      const json = await data.json();
      const roles = new Set(json.roles ?? []);

      const ADMIN_ROLE = "1061212827785900103"; // fake btw

      user.admin = roles.has(ADMIN_ROLE);
      user.discordId = json.user.id;

      //Update the admin role for the user
      await db.user.update({
        where: { id: user.id },
        data: {
          admin: user.admin,
        },
      });

      console.log("user", user);
      return true;
    },
  },
});

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const getServerAuthSession = () => null; //for now...
