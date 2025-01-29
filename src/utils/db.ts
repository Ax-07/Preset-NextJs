import { prisma } from "../lib/prisma";

export default async function getUserFromDb(email: string, pwHash: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: pwHash,
      },
    });
  
    return user;
  }