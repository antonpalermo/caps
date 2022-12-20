import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prismaClient'
import { unstable_getServerSession } from 'next-auth'
import { options } from '@auth/[...nextauth]'
import { Role } from '@prisma/client'

async function createTemplate(id: string) {
  try {
    return await prisma.doc.create({ data: { course: { connect: { id } } } })
  } catch (error) {
    console.log('createDocTemplate: ', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cid } = req.query
  const session = await unstable_getServerSession(req, res, options)
  const role = session.user.role

  if (role === Role.professor || role === Role.admin) {
    const template = await createTemplate(cid as string)
    return res.status(200).json(template)
  }

  return res.status(401).json({
    error: `Current access are not allowed to create course documents.`
  })
}
