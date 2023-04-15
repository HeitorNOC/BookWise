import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    return res.status(405).end()
  }
    const recentBooksRatings = await prisma.rating.findMany({
      orderBy: {
        created_at: 'desc'
      },
      take: 3,

    })

    console.log('oi')

    return res.status(200).json(recentBooksRatings);

  
}