import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    return res.status(405).end()
  }
    const recentBooksRatings = await prisma.rating.findMany({
      orderBy: {
        created_at: 'asc'
      },
      take: 3,
      select: {
        book_id: true,
        book: true,
        rate: true,
        user: true,
        created_at: true
      }
    })

    const popularBooks = await prisma.book.findMany({
      orderBy: {
        ratings: {
          _count: 'asc'
        },
      },
      take: 4,
      select: {
        name: true,
        ratings: true,
        cover_url: true,
        author: true
      }
    })


    return res.status(200).json([recentBooksRatings, popularBooks]);

  
}