import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@lib/prismaClient'

type IncomingAPIRequest = Omit<NextApiRequest, 'query'> & {
  query: {
    sid: string
  }
}

export default async function handler(
  req: IncomingAPIRequest,
  res: NextApiResponse
) {
  const sid = req.query.sid

  try {
    const doc = await prisma.doc.findUnique({ where: { id: sid } })

    if (!doc) {
      return res
        .status(404)
        .json({ error: `doc id ${sid} is currently not available` })
    }

    return res.status(200).json(doc)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'Internal Server Error: Unable to query doc collections' })
  }
}
