import { NextApiRequest, NextApiResponse } from 'next'

import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '../../../libs/prismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user = user
      return session
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  await NextAuth(req, res, options)

export default handler
