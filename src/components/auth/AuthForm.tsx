"use client";

import React, { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

/**
 * Props pour rendre le composant plus flexible :
 * - `registerUser?`: une fonction externe pour l'inscription (Dependency Injection).
 * - `onSuccessRedirect?`: URL de redirection après connexion.
 * - etc.
 */
type AuthFormProps = {
  isRegistering: boolean;
  registerUser?: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  onSuccessRedirect?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  isRegistering,
  registerUser,
  onSuccessRedirect = "/",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Pour l'inscription
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // --- 1) Gestion de l'inscription ---
      if (isRegistering) {
        // Si on nous a injecté une fonction registerUser, on l’utilise.
        if (registerUser) {
          await registerUser(name, email, password);
        } else {
          // Sinon, on fait un fetch par défaut vers "/api/auth/register"
          const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Erreur lors de l'inscription.");
          }
        }
      }

      // --- 2) Connexion avec NextAuth Credentials ---
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // On gère la redirection manuellement
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // --- 3) Redirection en cas de succès ---
      router.push(onSuccessRedirect);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-md shadow">
      <div className="mb-4 flex flex-col items-center">
        <p className="text-2xl font-bold">
          {isRegistering ? "Inscription" : "Connexion"}
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {isRegistering && (
          <>
            <Label htmlFor="name" className="hidden">
              Nom
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nom d'utilisateur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded"
            />
          </>
        )}
        <Label htmlFor="email" className="hidden">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded"
          required
        />
        <div className="flex flex-col">
          <Label htmlFor="password" className="hidden">
            Mot de passe
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded"
            required
          />
          <a href="/auth/forgot-password" className="text-sm text-primary ml-auto mt-2" >
            Mot de passe oublié ?
          </a>
        </div>
        <Button type="submit" className="w-full">
          {isRegistering ? "S'inscrire" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
