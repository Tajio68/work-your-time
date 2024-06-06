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
        authMethod: { label: "AuthMethod", type: "text" },
      },

      async authorize(credentials) {
        try {
          if (credentials?.email !== null) {
            const foundUser = await prisma.user.findUnique({
              where: {
                email: credentials?.email,
                password: credentials?.password,
                authMethod: credentials?.authMethod,
              },
            });
            if (foundUser) {
              return foundUser;
            } else {
              console.log("Incorrect password or mail");
            }
          }
        } catch (e) {
          console.log(e);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const userExist = await prisma.user.findUnique({
          where: { email: profile?.email },
        });
        if (userExist === null) {
          const createUser = await prisma.user.create({
            data: {
              email: profile?.email as string,
              password: "",
              authMethod: "GOOGLE",
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "http://localhost:3000/connect",
  },
};
