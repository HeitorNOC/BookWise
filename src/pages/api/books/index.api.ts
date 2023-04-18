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

    const bookDesc1 = await prisma.book.findUnique({
      where: {
        id: recentBooksRatings[0].book_id
      }
    })

    const bookDesc2 = await prisma.book.findUnique({
      where: {
        id: recentBooksRatings[1].book_id
      }
    })

    const bookDesc3 = await prisma.book.findUnique({
      where: {
        id: recentBooksRatings[2].book_id
      }
    })

    const books = [bookDesc1, bookDesc2, bookDesc3]

    return res.status(200).json(books);

  
}