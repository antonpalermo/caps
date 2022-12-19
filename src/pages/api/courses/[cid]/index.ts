import { NextApiRequest, NextApiResponse } from 'next'

async function getCourseById(id: string) {
  try {
    return await prisma.course.findUnique({ where: { id } })
  } catch (error) {
    console.log('getCourseByIdError: ', error)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cid } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: `HTTP method ${req.method} is currently not supported on this route`
    })
  }

  const course = await getCourseById(cid as string)
  return res.status(200).json(course)
}
