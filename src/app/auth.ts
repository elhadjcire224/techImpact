
import prisma from "@/db/prisma"
import { getUserByEmailForJwt } from "@/db/queries/user_queries"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      console.log('jwt')
      console.log('token', token)
      console.log('account', account)
      console.log('profile', profile)
      if (account && profile) {
        const user = await getUserByEmailForJwt(account.email as string)

        // Ajouter ces informations au token
        token.id = user?.id;
        token.role = user?.role;
        token.onboardingCompleted = user?.onboardingCompleted;
      }
      return token;
    },
  }
})