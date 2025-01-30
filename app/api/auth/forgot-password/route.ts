import { resetPasswordTemplate } from '@/src/lib/mail/templates';
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma"; // votre instance Prisma
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { sendMail } from "@/src/lib/mail/sendMail";

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
    const { subject, html } = resetPasswordTemplate(resetUrl);
    // 6) Envoyer l'email
    await sendMail({
      to: email,
      subject: subject,
      html: html,
      // from: "vous@votre-domaine.com" // Optionnel, sinon prend la valeur par défaut du .env
    })

    // 7) Réponse
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
