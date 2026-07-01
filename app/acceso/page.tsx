"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAula } from "@/components/aula/AulaProvider";
import type { Role } from "@/lib/aula/types";

const DEMO_CREDENTIALS: Record<Role, { email: string; password: string; who: string }> = {
  docente: { email: "maria@siies.app", password: "docente123", who: "Prof. María López" },
  alumno: { email: "juan@siies.app", password: "alumno123", who: "Juan Pérez" },
};

export default function Acceso() {
  const router = useRouter();
  const { ready, currentUser, login } = useAula();
  const [role, setRole] = useState<Role>("alumno");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya hay sesión activa, ir directo al aula.
  useEffect(() => {
    if (ready && currentUser) router.replace("/aula");
  }, [ready, currentUser, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = login(email, password, role);
    if (result.ok) {
      router.push("/aula");
    } else {
      setError(result.error);
    }
  }

  function fillDemo() {
    const demo = DEMO_CREDENTIALS[role];
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
  }

  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">
              S
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Accede a tu Aula SIIES
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Entra como alumno o docente para ver tus actividades y formularios.
            </p>
          </div>

          {/* Selector de rol */}
          <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            {(["alumno", "docente"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setError("");
                }}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  role === r
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                aria-pressed={role === r}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Correo
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                placeholder="tucorreo@siies.app"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Acceso de ejemplo */}
          <div className="mt-6 rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-4 text-center">
            <p className="text-xs font-medium text-brand-800">
              Acceso de ejemplo ({role})
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {DEMO_CREDENTIALS[role].email} · {DEMO_CREDENTIALS[role].password}
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2 text-xs font-semibold text-brand-700 underline-offset-2 hover:underline"
            >
              Rellenar automáticamente
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Solo quieres ver el sitio?{" "}
          <Link href="/" className="font-medium text-brand-600 hover:text-brand-700">
            Volver al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
