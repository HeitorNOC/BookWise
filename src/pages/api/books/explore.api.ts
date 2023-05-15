import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    return res.status(405).end()
  }


  const getAllBooks = await prisma.book.findMany({
    orderBy: {
      ratings: {
        _count: "asc"
      }
    },
    select: {
      ratings: {
        select: {
          user: true,
          created_at: true,
          description: true,
          rate: true,
        }
      },
      id: true,
      author: true,
      categories: {
        select: {
          categoryId: true,
          category: {
            select: {
              name: true,
              
            }
          }
        }
      },
      total_pages: true,
      cover_url: true,
      name: true,
    }
  })

  const getAllCategories = await prisma.categoriesOnBooks.findMany({
    select: {
      category: true,
    },
     distinct: "categoryId"
  })

  return res.status(200).json([getAllBooks, getAllCategories])
}