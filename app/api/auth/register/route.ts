import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"
import { registerSchema } from "@/src/lib/auth/authValidators"
import saltAndHashPassword from "@/src/utils/hashPassword"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // body = { name, email, password }

    // 1) Validation des champs avec Zod (ou autre)
    const { name, email, password } = registerSchema.parse(body)

    // 2) Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 400 }
      )
    }

    // 3) Hasher le mot de passe
    const hashed = await saltAndHashPassword(password)

    // 4) Créer le user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    })

    // 5) Répondre avec succès
    return NextResponse.json({ message: "Inscription réussie" }, { status: 201 })
  } catch (error: any) {
    // On peut renvoyer l’erreur Zod ou un message générique
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'inscription" },
      { status: 400 }
    )
  }
}
