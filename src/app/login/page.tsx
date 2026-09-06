"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/browser";

type Mode = "login" | "signup" | "forgot";

const modeCopy: Record<Mode, { title: string; description: string; submit: string }> = {
  login: { title: "Inloggen", description: "Log in om je ritten te bekijken.", submit: "Inloggen" },
  signup: { title: "Account aanmaken", description: "Maak een persoonlijk account voor Trip Ledger.", submit: "Account aanmaken" },
  forgot: { title: "Wachtwoord vergeten", description: "Ontvang een link om je wachtwoord opnieuw in te stellen.", submit: "Resetlink sturen" },
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage(null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const supabase = createClient();
    let authError = null;

    if (mode === "login") {
      const result = await supabase.auth.signInWithPassword({ email, password });
      authError = result.error;
      if (!authError) router.push("/");
    } else if (mode === "signup") {
      const result = await supabase.auth.signUp({ email, password });
      authError = result.error;
      if (!authError) {
        setMessage(
          result.data.session
            ? "Je account is aangemaakt. Je wordt ingelogd."
            : "Je account is aangemaakt. Controleer je e-mail om je account te bevestigen.",
        );
      }
    } else {
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      authError = result.error;
      if (!authError) setMessage("Controleer je e-mail voor de resetlink.");
    }

    setIsSubmitting(false);
    if (authError) setError(authError.message);
  }

  const copy = modeCopy[mode];
  const needsPassword = mode !== "forgot";

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-sm border border-border p-6">
        <h1 className="mb-2 text-2xl">trip ledger</h1>
        <h2 className="mb-1 text-lg">{copy.title}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{copy.description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            E-mailadres
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="border border-border bg-transparent px-3 py-2" />
          </label>
          {needsPassword ? (
            <label className="flex flex-col gap-2 text-sm">
              Wachtwoord
              <input required minLength={6} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} className="border border-border bg-transparent px-3 py-2" />
            </label>
          ) : null}
          <button type="submit" disabled={isSubmitting} className="border border-foreground px-3 py-2 disabled:opacity-50">
            {isSubmitting ? "Bezig..." : copy.submit}
          </button>
        </form>
        <div className="mt-5 flex flex-col gap-2 text-sm">
          {mode === "login" ? (
            <>
              <button type="button" onClick={() => changeMode("signup")} className="text-left hover:underline">Account aanmaken</button>
              <button type="button" onClick={() => changeMode("forgot")} className="text-left hover:underline">Wachtwoord vergeten?</button>
            </>
          ) : (
            <button type="button" onClick={() => changeMode("login")} className="text-left hover:underline">Terug naar inloggen</button>
          )}
        </div>
        {message ? <p className="mt-4 text-sm text-green-600">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </section>
    </main>
  );
}