import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soporte",
  description:
    "Centro de soporte de SIIES: preguntas frecuentes y canales de contacto para resolver tus dudas.",
};

const faqs = [
  {
    question: "¿Cómo recupero mi contraseña?",
    answer:
      "En la pantalla de inicio de sesión selecciona “¿Olvidaste tu contraseña?” y sigue las instrucciones que llegarán a tu correo institucional. Si no recibes el correo, contacta al administrador de tu institución.",
  },
  {
    question: "¿SIIES funciona en celulares y tabletas?",
    answer:
      "Sí. SIIES Web es compatible con cualquier navegador moderno, y además contamos con apps móviles para alumnos y docentes.",
  },
  {
    question: "¿Qué necesito para implementar SIIES en mi institución?",
    answer:
      "Solo necesitas conexión a internet. Nuestro equipo se encarga de la configuración inicial, la migración de datos y la capacitación del personal.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí. La información se transmite cifrada y se respalda periódicamente. Consulta nuestro aviso de privacidad para conocer el detalle del tratamiento de datos.",
  },
  {
    question: "¿Tienen costo las actualizaciones?",
    answer:
      "No. Las mejoras y actualizaciones de la plataforma están incluidas en tu servicio y se aplican automáticamente.",
  },
];

export default function Soporte() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Centro de soporte
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            Estamos para ayudarte. Revisa las preguntas frecuentes o escríbenos
            directamente; nuestro equipo responde en horario hábil.
          </p>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white p-5"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 marker:content-none">
                {faq.question}
                <span className="ml-4 text-brand-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-slate-50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Contáctanos</h2>
          <p className="mt-3 text-slate-600">
            ¿No encontraste lo que buscabas? Escríbenos por cualquiera de estos
            medios.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Correo de soporte</h3>
              <p className="mt-2 text-sm text-slate-600">
                Respondemos en un máximo de 24 horas hábiles.
              </p>
              <a
                href="mailto:soporte@siies.app"
                className="mt-4 inline-block font-medium text-brand-600 hover:text-brand-700"
              >
                soporte@siies.app
              </a>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Horario de atención</h3>
              <p className="mt-2 text-sm text-slate-600">
                Lunes a viernes
                <br />
                9:00 a 18:00 h (hora del centro de México)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
