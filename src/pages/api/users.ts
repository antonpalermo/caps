import { User } from '@prisma/client'
import { prisma } from '@lib/prismaClient'

import { options } from '@auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

type IncomingAPIRequest = Omit<NextApiRequest, 'method' | 'body'> & {
  method: 'PATCH'
  body: Partial<User>
}

async function patchSelectedUser(data: Partial<User>) {
  try {
    return await prisma.user.update({
      where: { id: data.id },
      data
    })
  } catch (error) {
    console.log(error)
  }
}

const handler = async (req: IncomingAPIRequest, res: NextApiResponse) => {
  const body = req.body
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return res.status(401).json({ message: 'needs authentication' })
  }

  if (req.method === 'PATCH') {
    const user = patchSelectedUser({ id: session.user.id, ...body })
    if (!user) {
      return res
        .status(500)
        .json({ message: 'error unable to update selected user' })
    }
    // TODO: do better response here
    return res.status(200).json({ message: 'user updated' })
  }
}

export default handler
