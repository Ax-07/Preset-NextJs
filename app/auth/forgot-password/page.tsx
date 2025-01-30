"use client"

import { Button } from "@/src/components/ui/button"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Une erreur est survenue.")
    } else {
      setSuccess("Un email de réinitialisation a été envoyé.")
    }
  }

  return (
    <section className="py-10">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mot de passe oublié</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <Button
            variant="default"
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Envoyer le lien de réinitialisation
          </Button>
        </form>
      </div>
    </section>
  )
}
