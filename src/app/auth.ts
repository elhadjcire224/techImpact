
import prisma from "@/db/prisma"
import { getUserByEmailForJwt } from "@/db/queries/user_queries"
import { UserRole } from "@/types/user_roles"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [Google({
    authorization: {
      params: {
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        prompt: "consent",
      }
    }
  })],
  adapter: PrismaAdapter(prisma),
  callbacks: {

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await getUserByEmailForJwt(token.email as string);

        if (user) {
          token.id = user.id;
          token.role = user.role;
          token.onboardingCompleted = user.onboardingCompleted;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id as string;
      }
      return session;
    }
  }
})
