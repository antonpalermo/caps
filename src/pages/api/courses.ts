import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prismaClient'
import { unstable_getServerSession } from 'next-auth'
import { options } from './auth/[...nextauth]'
import { Course, Role } from '@prisma/client'

type IncomingAPIRequest = Omit<NextApiRequest, 'method'> & {
  method: 'POST'
}

const handler = async (req: IncomingAPIRequest, res: NextApiResponse) => {
  const method = req.method
  const session = await unstable_getServerSession(req, res, options)

  // handler check if the user has professor role.
  if (session.user.role !== Role.professor) {
    // if not return error.
    return res
      .status(405)
      .json({ error: { message: 'not allowed to create course.' } })
  }

  // we only allow post method to create course template.
  if (method === 'POST') {
    // call create template code.
    const { data, error } = await createTemplate(session.user.email)

    if (error) {
      // if error is present then return the error to the ui.
      return res.status(405).json(error)
    }
    // return create course data.
    return res.status(201).json({ data })
  }
}

/**
 * create a temporary course template
 * @param email of user who created the course.
 * @returns created course data.
 */
async function createTemplate(
  email: string
): Promise<{ data?: Course | null; error?: { message: string } | null }> {
  try {
    // create new course template.
    const course = await prisma.course.create({
      // connect new course template to authenticated users.
      data: { user: { connect: { email } } }
    })
    // return created course.
    return { data: course, error: null }
  } catch (error) {
    // log the error TODO: for future create a loggin service.
    console.log(error)
    return {
      data: null,
      error: { message: 'Unable to create course template.' }
    }
  }
}

export default handler
