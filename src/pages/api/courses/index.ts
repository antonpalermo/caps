import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prismaClient'

async function getAllCourse() {
  try {
    return await prisma.course.findMany({
      include: { user: { select: { name: true, image: true } } }
    })
  } catch (error) {
    console.log('getAllCourse: ', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: `HTTP method ${req.method} is currently not supported on this route`
    })
  }

  const courses = await getAllCourse()
  return res.status(200).json(courses)
}
