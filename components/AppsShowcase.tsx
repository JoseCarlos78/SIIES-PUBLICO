"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Screen = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type App = {
  key: string;
  name: string;
  tag: string;
  description: string;
  logo: string | null;
  screens: Screen[];
};

// Convención de capturas: coloca los PNG en `public/` y agrégalos al
// arreglo `screens` de cada app (2 a 3 por app). Nombre sugerido:
// `siies-<app>-<n>.png`, por ejemplo `siies-padres-1.png`.
const apps: App[] = [
  {
    key: "web",
    name: "SIIES Web",
    tag: "Plataforma web",
    description:
      "El portal completo para la administración escolar: control de alumnos, docentes, grupos, horarios, calificaciones y reportes oficiales.",
    logo: null,
    screens: [],
  },
  {
    key: "alumnos",
    name: "SIIES Alumnos",
    tag: "App móvil",
    description:
      "App móvil para que los alumnos consulten su horario, calificaciones, avisos y trámites desde cualquier lugar.",
    logo: "/logo-siies-alumno.png",
    screens: [],
  },
  {
    key: "docentes",
    name: "SIIES Docentes",
    tag: "App móvil",
    description:
      "Herramienta para profesores: pase de lista, captura de calificaciones, disponibilidad de horarios y comunicación con la institución.",
    logo: "/logo-siies-docentes.png",
    screens: [],
  },
  {
    key: "padres",
    name: "SIIES Padres",
    tag: "App móvil",
    description:
      "App móvil para las familias: consulta de calificaciones, horarios, asistencia y avisos del alumno, además de comunicación directa con la escuela.",
    logo: "/logo-siies-padres.png",
    screens: [],
  },
  {
    key: "prefecto",
    name: "SIIES Prefecto",
    tag: "App móvil",
    description:
      "Herramienta para prefectos: genera incidencias de los alumnos y toma la asistencia de los docentes en clase, salón por salón.",
    logo: "/logo-siies-prefecto.png",
    screens: [
      {
        src: "/HOME_PREFECTO.PNG",
        alt: "Pantalla de inicio de la app SIIES Prefecto con el resumen del día",
        title: "Tu día de un vistazo",
        description:
          "Reportes, salones visitados y docentes ausentes en un solo panel. Desde aquí el prefecto genera una incidencia o inicia el pase de asistencia.",
      },
      {
        src: "/INCIDENCIA_PREFECTO.PNG",
        alt: "Pantalla para generar una incidencia en la app SIIES Prefecto",
        title: "Incidencias en segundos",
        description:
          "Registra reportes leves o mayores de un alumno: tipo de reporte, título, asignatura o momento y la descripción de lo ocurrido.",
      },
    ],
  },
];

// Estado por defecto: cuando no se ha seleccionado ninguna tarjeta, se
// muestran las capturas de SIIES Padres.
const DEFAULT_APP_KEY = "padres";

export default function AppsShowcase() {
  const [selectedKey, setSelectedKey] = useState(DEFAULT_APP_KEY);
  const [lightbox, setLightbox] = useState<Screen | null>(null);
  const selected = apps.find((app) => app.key === selectedKey) ?? apps[0];

  // Cierra el lightbox con Escape y bloquea el scroll del fondo.
  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Las apps de SIIES
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Un ecosistema de aplicaciones pensado para cada integrante de la
          comunidad educativa. Selecciona una tarjeta para ver la app por
          dentro.
        </p>
      </div>

      {/* Tarjetas seleccionables */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {apps.map((app) => {
          const isSelected = app.key === selectedKey;
          return (
            <button
              key={app.key}
              type="button"
              onClick={() => setSelectedKey(app.key)}
              aria-pressed={isSelected}
              className={`rounded-2xl border-2 bg-white p-6 text-left transition-all ${
                isSelected
                  ? "border-brand-500 bg-brand-50/40 shadow-md ring-2 ring-brand-200"
                  : "border-slate-200 shadow-sm hover:border-brand-200 hover:shadow-md"
              }`}
            >
              {app.logo && (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50">
                  <Image
                    src={app.logo}
                    alt={`Logo de ${app.name}`}
                    width={1024}
                    height={1024}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              )}
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                {app.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {app.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {app.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Escaparate de la app seleccionada */}
      <div className="mt-12 rounded-3xl bg-slate-900 px-4 py-14 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          {selected.logo && (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
              <Image
                src={selected.logo}
                alt={`Logo de ${selected.name}`}
                width={1024}
                height={1024}
                className="h-12 w-12 object-contain"
              />
            </div>
          )}
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {selected.name}
          </h3>
          <p className="max-w-2xl text-slate-300">{selected.description}</p>
        </div>

        {selected.screens.length > 0 ? (
          <div className="mt-12 grid justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {selected.screens.map((screen) => (
              <div key={screen.src} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setLightbox(screen)}
                  aria-label={`Ampliar: ${screen.title}`}
                  className="group relative rounded-[2.6rem] outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-brand-400"
                >
                  {/* Marco de teléfono */}
                  <div className="relative overflow-hidden rounded-[2.6rem] border-[6px] border-slate-700 bg-slate-800 shadow-2xl ring-1 ring-black/40">
                    {/* Notch */}
                    <span className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={1320}
                      height={2868}
                      className="h-auto w-56 sm:w-60"
                    />
                    {/* Indicador de ampliar */}
                    <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                        🔍 Ampliar
                      </span>
                    </span>
                  </div>
                </button>
                <h4 className="mt-6 text-lg font-semibold text-white">
                  {screen.title}
                </h4>
                <p className="mt-2 max-w-xs text-center text-sm leading-relaxed text-slate-300">
                  {screen.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center">
            <div className="flex h-[28rem] w-56 flex-col items-center justify-center gap-3 rounded-[2.5rem] border-4 border-dashed border-slate-700 bg-slate-800/50 px-6 text-center">
              <span className="text-3xl">📱</span>
              <p className="text-sm font-medium text-slate-300">
                Capturas próximamente
              </p>
              <p className="text-xs text-slate-500">
                Las imágenes de {selected.name} estarán disponibles muy pronto.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox de capturas */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="aula-modal overflow-hidden rounded-[2.5rem] border-[6px] border-slate-700 bg-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1320}
              height={2868}
              className="h-auto w-64 max-w-[80vw] sm:w-80"
            />
          </div>
          <p className="mt-5 max-w-sm text-center text-sm text-slate-300">
            <span className="font-semibold text-white">{lightbox.title}.</span>{" "}
            {lightbox.description}
          </p>
        </div>
      )}
    </section>
  );
}
