import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const updateRating = z.object({
  description: z.string(),
  rate: z.number()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'PUT') {
    return res.status(405).end()
  }

  const bookId = String(req.query.bookId)
  const { description, rate } = updateRating.parse(req.body)

  const userToken = req.cookies['next-auth.session-token']
  let id: string | undefined

  if (userToken) {
    const userLoged = await prisma.session.findUnique({
      where: {
        sessionToken: userToken
      },
      select: {
        userId: true,

      }
    })
    id = userLoged?.userId

    if (id != undefined) {


      await prisma.book.update({
        where: {
          id: bookId
        },
        data: {
          ratings: {
            create: {
              description: description,
              rate: rate,
              user_id: id,
              created_at: String(new Date())
            }
          }
        }
      })
    }
  }

  return res.status(204).end()
}