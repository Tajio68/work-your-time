import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "E-mail" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (credentials?.email !== null) {
            const foundUser = await prisma.user.findUnique({
              where: {
                email: credentials?.email,
                password: credentials?.password,
              },
            });
            if (foundUser) {
              return foundUser;
            } else {
              alert("Incorrect password or mail address");
            }
          }
        } catch (e) {
          console.log(e);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "http://localhost:3000/connect",
  },
};
