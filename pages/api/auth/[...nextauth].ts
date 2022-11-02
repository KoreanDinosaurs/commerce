import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async session({ session, user }) {
      session.id = user.id
      return session
    },
  },
}
export default NextAuth(authOptions)
