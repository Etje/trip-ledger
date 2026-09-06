"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../lib/supabase/browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);
    const { error: updateError } = await createClient().auth.updateUser({ password });
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setMessage("Je wachtwoord is gewijzigd. Je kunt nu inloggen.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-sm border border-border p-6">
        <h1 className="mb-2 text-2xl">Nieuw wachtwoord</h1>
        <p className="mb-6 text-sm text-muted-foreground">Kies een nieuw wachtwoord voor je account.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            Nieuw wachtwoord
            <input required minLength={6} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="border border-border bg-transparent px-3 py-2" />
          </label>
          <button type="submit" disabled={isSubmitting} className="border border-foreground px-3 py-2 disabled:opacity-50">
            {isSubmitting ? "Opslaan..." : "Wachtwoord opslaan"}
          </button>
        </form>
        {message ? <p className="mt-4 text-sm text-green-600">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </section>
    </main>
  );
}