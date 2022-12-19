import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prismaClient'
import { unstable_getServerSession } from 'next-auth'
import { options } from '@auth/[...nextauth]'
import { Role } from '@prisma/client'

async function createTemplate(email: string) {
  try {
    return await prisma.course.create({
      data: { user: { connect: { email } } }
    })
  } catch (error) {
    console.log('createTemplateError: ', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, options)
  const role = session.user.role
  const email = session.user.email

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: `HTTP method ${req.method} is currently not supported on this route`
    })
  }

  if (role === Role.professor || role === Role.admin) {
    const template = await createTemplate(email)
    return res.status(200).json(template)
  }

  return res
    .status(400)
    .json({ error: `Current access are not allowed to create course template` })
}
