import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prismaClient'

async function getDocs(id: string) {
  try {
    return await prisma.course.findUnique({ where: { id } }).docs()
  } catch (error) {
    console.log('getDocsError: ', error)
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

  const docs = await getDocs(cid as string)
  return res.status(200).json(docs)
}
