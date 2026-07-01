"use client";

import { useAula } from "@/components/aula/AulaProvider";
import DocenteDashboard from "@/components/aula/DocenteDashboard";
import AlumnoDashboard from "@/components/aula/AlumnoDashboard";

export default function AulaPage() {
  const { currentUser } = useAula();

  // El layout garantiza que currentUser existe; esto es solo por seguridad de tipos.
  if (!currentUser) return null;

  return currentUser.role === "docente" ? (
    <DocenteDashboard />
  ) : (
    <AlumnoDashboard />
  );
}
