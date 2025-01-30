import nodemailer from "nodemailer"

/**
 * 
 * @returns Un transporter nodemailer configuré avec les variables d'environnement
 */
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}