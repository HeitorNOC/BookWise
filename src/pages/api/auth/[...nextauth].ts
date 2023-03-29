import NextAuth from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET  ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile: (profile: GoogleProfile) => {
        return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture
        }
      }
      
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    })
  ],

  callbacks: {
    async signIn({ account }) {
      console.log(account)
      if (account?.provider === "google") {
        return '/login/?error=permissions'
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, user }) {
      return {
        ...session,
        user
      }
    }
  }
})