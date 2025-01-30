import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token et nouveau mot de passe requis" },
        { status: 400 }
      )
    }

    // 1) Rechercher le user correspondant au token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(), // le token n'est pas expiré
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 400 }
      )
    }

    // 2) Hasher le nouveau mot de passe
    const hashed = await bcrypt.hash(newPassword, 10)

    // 3) Mettre à jour le user en DB (remettre resetToken à null)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de la réinitialisation" },
      { status: 500 }
    )
  }
}
