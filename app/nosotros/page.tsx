import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce al equipo detrás de SIIES y nuestra misión: simplificar la gestión educativa con tecnología.",
};

const values = [
  {
    title: "Cercanía",
    description:
      "Trabajamos de la mano con cada institución; entendemos su operación real antes de proponer tecnología.",
  },
  {
    title: "Simplicidad",
    description:
      "Los procesos escolares ya son complejos. Nuestro software los hace simples, no al revés.",
  },
  {
    title: "Confiabilidad",
    description:
      "La información académica es delicada. La protegemos y garantizamos que esté disponible cuando se necesita.",
  },
  {
    title: "Mejora continua",
    description:
      "Escuchamos a directivos, docentes y alumnos para evolucionar la plataforma cada ciclo escolar.",
  },
];

export default function Nosotros() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Quiénes somos
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            SIIES nació dentro de las aulas: de la necesidad real de las
            instituciones educativas de dejar atrás las hojas de cálculo, los
            procesos manuales y la información dispersa. Hoy somos una
            plataforma integral que acompaña a las escuelas durante todo el
            ciclo escolar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900">Nuestra misión</h2>
            <p className="mt-4 text-slate-600">
              Simplificar la gestión educativa con tecnología accesible, para
              que las instituciones dediquen su tiempo a lo que de verdad
              importa: enseñar y acompañar a sus alumnos.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900">Nuestra visión</h2>
            <p className="mt-4 text-slate-600">
              Ser la plataforma de referencia en gestión escolar, presente en
              cada etapa del ciclo educativo y reconocida por su cercanía con
              las instituciones que confían en nosotros.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Nuestros valores
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-700">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          ¿Quieres conocernos mejor?
        </h2>
        <p className="mt-3 text-slate-600">
          Con gusto te platicamos cómo trabajamos y qué podemos hacer por tu institución.
        </p>
        <Link
          href="/soporte#contacto"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Contáctanos
        </Link>
      </section>
    </>
  );
}
