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
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
export default NextAuth(authOptions)
