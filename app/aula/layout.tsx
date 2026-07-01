"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAula } from "@/components/aula/AulaProvider";
import Avatar from "@/components/aula/Avatar";

export default function AulaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { ready, currentUser, logout, courses } = useAula();

  // Protección de ruta: sin sesión, redirige al acceso.
  useEffect(() => {
    if (ready && !currentUser) router.replace("/acceso");
  }, [ready, currentUser, router]);

  if (!ready || !currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Barra del aula */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Avatar user={currentUser} />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-500">
                {currentUser.role === "docente"
                  ? `Docente · ${
                      new Set(
                        courses
                          .filter((c) => c.teacherId === currentUser.id)
                          .map((c) => c.subject),
                      ).size
                    } materias`
                  : `Alumno · ${currentUser.group}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/acceso");
            }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:px-6">
        {children}
      </div>
    </div>
  );
}
