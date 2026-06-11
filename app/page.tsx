import Link from "next/link";

const apps = [
  {
    name: "SIIES Web",
    description:
      "El portal completo para la administración escolar: control de alumnos, docentes, grupos, horarios, calificaciones y reportes oficiales.",
    tag: "Plataforma web",
  },
  {
    name: "SIIES Alumnos",
    description:
      "App móvil para que los alumnos consulten su horario, calificaciones, avisos y trámites desde cualquier lugar.",
    tag: "App móvil",
  },
  {
    name: "SIIES Docentes",
    description:
      "Herramienta para profesores: pase de lista, captura de calificaciones, disponibilidad de horarios y comunicación con la institución.",
    tag: "App móvil",
  },
];

const services = [
  {
    title: "Control escolar",
    description:
      "Inscripciones, reinscripciones, kárdex, historial académico y documentación oficial en un solo sistema.",
    icon: "📋",
  },
  {
    title: "Generación de horarios",
    description:
      "Genera automáticamente el horario oficial de tu escuela a partir del anteproyecto, la disponibilidad de docentes y los salones.",
    icon: "🗓️",
  },
  {
    title: "Calificaciones y evaluación",
    description:
      "Captura de calificaciones, actas, boletas y estadísticas de aprovechamiento con validaciones automáticas.",
    icon: "📊",
  },
  {
    title: "Comunicación institucional",
    description:
      "Avisos, notificaciones y mensajes entre la institución, los docentes, los alumnos y sus familias.",
    icon: "💬",
  },
  {
    title: "Reportes y estadísticas",
    description:
      "Indicadores académicos y administrativos para tomar decisiones con información real y al día.",
    icon: "📈",
  },
  {
    title: "Soporte y acompañamiento",
    description:
      "Capacitación, implementación y soporte técnico continuo para tu institución durante todo el ciclo escolar.",
    icon: "🤝",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
            Sistema Integral de Información Educativa
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            La gestión de tu escuela,{" "}
            <span className="text-brand-600">simple y en un solo lugar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            SIIES integra control escolar, horarios, calificaciones y
            comunicación en una plataforma moderna para instituciones
            educativas, docentes, alumnos y familias.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/soporte#contacto"
              className="rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Solicitar una demostración
            </Link>
            <Link
              href="/nosotros"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Conoce SIIES
            </Link>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Las apps de SIIES
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Un ecosistema de aplicaciones pensado para cada integrante de la
            comunidad educativa.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {apps.map((app) => (
            <div
              key={app.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                {app.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {app.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Todo lo que tu institución necesita
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Servicios diseñados para cubrir el ciclo escolar completo, desde
              la planeación hasta la entrega de resultados.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{service.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl bg-brand-600 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            ¿Listo para transformar la gestión de tu escuela?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Escríbenos y te mostramos cómo SIIES se adapta a tu institución.
          </p>
          <Link
            href="/soporte#contacto"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Hablar con nosotros
          </Link>
        </div>
      </section>
    </>
  );
}
