"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import AdminLoading from "@/components/admin/AdminLoading";
import { auth } from "@/lib/firebase";

const ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/invalid-email": "El correo no es válido.",
  "auth/user-disabled": "Esta cuenta está deshabilitada.",
  "auth/too-many-requests": "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
  "auth/network-request-failed": "No hay conexión. Revisa tu internet e inténtalo de nuevo.",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/admin");
  }, [loading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : "";
      setError(ERROR_MESSAGES[code] ?? "No se pudo iniciar sesión. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  }

  if (loading || user) return <AdminLoading />;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <Image
          src="/brand/vercorp-desarrolladora-logo-dark.png"
          alt="Vercorp Desarrolladora"
          width={900}
          height={291}
          priority
          className="mx-auto h-10 w-auto"
        />

        <div className="mt-10 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h1 className="font-serif text-3xl font-semibold">Administración</h1>
          <p className="mt-1.5 text-sm text-foreground/60">
            Ingresa con tu cuenta para continuar.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <label className="block">
              <span className="text-xs font-medium tracking-wide text-foreground/70">
                Correo electrónico
              </span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 block h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium tracking-wide text-foreground/70">
                Contraseña
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 block h-11 w-full rounded-lg border border-black/10 bg-white px-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
              />
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !email || !password}
              className="mt-2 h-11 w-full rounded-lg bg-accent text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
