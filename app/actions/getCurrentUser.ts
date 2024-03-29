import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismaDb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createAt: user.createAt.toISOString(),
      updateAt: user.updateAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
      
    };
  } catch (error: any) {
    return null;
  }
}
