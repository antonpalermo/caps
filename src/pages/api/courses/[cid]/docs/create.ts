import { NextApiRequest, NextApiResponse } from 'next'

import { Role } from '@prisma/client'
import { prisma } from '@lib/prismaClient'
import { options } from '@auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

type IncomingApiRequest = Omit<NextApiRequest, 'method' | 'query' | 'body'> & {
  method: 'POST'
  query: { cid: string }
  body: { header: string }
}

export default async function handler(
  req: IncomingApiRequest,
  res: NextApiResponse
) {
  const { cid } = req.query
  const { header } = req.body
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return res.status(401).json({
      error: `Only authenticated users can access this resource.`
    })
  }

  const role = session.user.role

  if (role === Role.professor || role === Role.admin) {
    try {
      const doc = await prisma.doc.create({
        data: { header, course: { connect: { id: cid } } }
      })
      return res.status(200).json(doc)
    } catch (error) {
      console.log('Create Doc Error: ', error)
      return res.status(500).json({
        error: `Unable to create doc please contact your system administrator`
      })
    }
  }

  return res.status(401).json({
    error: `Current access are not allowed to create course documents.`
  })
}
