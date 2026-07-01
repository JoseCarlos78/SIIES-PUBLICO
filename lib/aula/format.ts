// Utilidades de formato compartidas por el módulo Aula.

export function formatDate(iso: string): string {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  return d.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Días restantes hasta la fecha límite (negativo si ya pasó). */
export function daysUntil(isoDate: string): number {
  const due = new Date(`${isoDate}T23:59:59`);
  const now = new Date();
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function dueLabel(isoDate: string): { text: string; tone: string } {
  const days = daysUntil(isoDate);
  if (days < 0) return { text: "Vencida", tone: "bg-rose-50 text-rose-700" };
  if (days === 0) return { text: "Vence hoy", tone: "bg-amber-50 text-amber-700" };
  if (days === 1) return { text: "Vence mañana", tone: "bg-amber-50 text-amber-700" };
  if (days <= 3)
    return { text: `Vence en ${days} días`, tone: "bg-amber-50 text-amber-700" };
  return { text: `Vence en ${days} días`, tone: "bg-slate-100 text-slate-600" };
}
