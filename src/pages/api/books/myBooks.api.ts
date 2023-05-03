import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    return res.status(405).end()
  }

  const userToken = req.cookies['next-auth.session-token']
  let id: string | undefined

  if(userToken) {
    const userLoged = await prisma.session.findUnique({
      where: {
        sessionToken: userToken
      },
      select: {
        userId: true,

      }
    })
    id = userLoged?.userId


  }
  const userRatedBooks = await prisma.rating.findMany({
    where: {
      user_id: id
    },
    select: {
      book: true,
      created_at: true,
      rate: true
    }
  })

  const profile = await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      created_at: true,
      name: true,
      avatar_url: true
    }
  })

  return res.status(200).json([userRatedBooks, profile])

}