import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { z } from "zod";

const createUserBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar_url: z.string(),
  email: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req, 
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }
  
  const { name, avatar_url, email } = createUserBodySchema.parse(req.body)

  const userExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Usuário já existe.'
    })
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      avatar_url: avatar_url,
      email: email
    },
  })

  setCookie({ res }, '@ignitebookwise:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
  return res.status(201).json(user)

}

function buildNextAuthOptions(req: NextApiRequest, res: NextApiResponse): any {
  throw new Error("Function not implemented.");
}
