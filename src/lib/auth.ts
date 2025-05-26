import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // user is the user object from the database
        token.user = user
      }
      return token
    },
    session({ session, token }) {
      const user = token.user as { id: string } | undefined;
      if (user?.id) {
        session.user.id = user.id;
      }
      return session
    },
  },
  ...authConfig,
})