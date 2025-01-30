"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token") // le token dans l'URL

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }
    setError("")
    setSuccess("")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Erreur lors de la réinitialisation.")
    } else {
      setSuccess("Votre mot de passe a été mis à jour.")
      // Optionnel: rediriger après quelques secondes
      // setTimeout(() => router.push("/auth"), 3000)
    }
  }

  return (
    <section className="py-10">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </section>
  )
}
