import nodemailer from "nodemailer"
import { createTransporter } from "./nodemailer-config"

let transporter: nodemailer.Transporter | null = null

/**
 * Fonction utilitaire pour envoyer un email.
 * @param to Destinataire
 * @param subject Sujet de l'email
 * @param html Contenu HTML
 */
export async function sendMail({
  to,
  subject,
  html,
  from,
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  // Initialiser le transporter si pas déjà fait
  if (!transporter) {
    transporter = createTransporter()
  }

  const mailOptions = {
    from: from || process.env.EMAIL_FROM, // Valeur par défaut
    to,
    subject,
    html,
  }

  await transporter.sendMail(mailOptions)
}
