import { PrismaClient } from "@prisma-app/client";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { reactStartCookies } from "better-auth/react-start";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [reactStartCookies()],
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export const getSessionServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return await auth.api.getSession({
      headers: getRequestHeaders(),
    });
  },
);
