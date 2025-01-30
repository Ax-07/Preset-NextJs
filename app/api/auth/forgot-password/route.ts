import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // votre instance Prisma
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    // 1) Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Pour la sécurité, on peut renvoyer un "success" muet
      // pour ne pas révéler si l'email existe ou non
      return NextResponse.json({ success: true });
    }

    // 2) Générer un token de réinitialisation
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 heure

    // 3) Enregistrer ce token en base
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // 4) Envoyer l'email avec le lien de reset
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    // 5) Configurer le transport Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 6) Envoyer l'email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // "noreply@votredomaine.com"
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
    <p>Bonjour,</p>
    <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur ce lien pour créer un nouveau mot de passe :</p>
    <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    <p>Ce lien expirera dans 1 heure.</p>
  `,
    });

    // 7) Réponse
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
