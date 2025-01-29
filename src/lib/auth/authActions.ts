"use server";

import { signIn, signOut } from "@/src/lib/auth/authConfig";
import { prisma } from "../prisma";
import { registerSchema } from "./authValidators";
import saltAndHashPassword from "@/src/utils/hashPassword";


/**
 * Fonction pour se connecter avec Github
 */
export async function loginWithGithub() {
  await signIn("github");
}

/**
 * Fonction pour se connecter avec Google
 */
export async function loginWithGoogle() {
  await signIn("google");
}

/**
 * Fonction pour se déconnecter
 */
export async function logout() {
  await signOut();
}

/**
 * Fonction pour se connecter avec email et mot de passe
 * @param email 
 * @param password 
 * @returns 
 */
export async function login(email: string, password: string) {
  const response = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}

/**
 * Fonction pour s'inscrire avec email, mot de passe et nom
 * @param name 
 * @param email 
 * @param password 
 * @returns 
 */
export async function register(name: string, email: string, password: string) {
  try {
    // Validation avec Zod
    registerSchema.parse({ name, email, password });

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé !");
    }

    const hashedPassword = await saltAndHashPassword(password);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return await login(email, password);
  } catch (error) {
    throw new Error("Erreur lors de l'inscription.");
  }
}