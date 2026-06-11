import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso de la plataforma y las aplicaciones de SIIES.",
};

export default function Terminos() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Términos y condiciones
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Última actualización: 11 de junio de 2026
      </p>

      <div className="mt-10 space-y-10 leading-relaxed text-slate-600">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            1. Aceptación de los términos
          </h2>
          <p className="mt-3">
            Al acceder o utilizar la plataforma SIIES Web o las aplicaciones
            móviles de SIIES (en conjunto, “el Servicio”), aceptas estos
            términos y condiciones. Si no estás de acuerdo, no debes utilizar
            el Servicio.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            2. Uso del Servicio
          </h2>
          <p className="mt-3">
            El Servicio está destinado a instituciones educativas y a sus
            comunidades (directivos, docentes, alumnos y familias). Las cuentas
            son personales e intransferibles; eres responsable de mantener la
            confidencialidad de tus credenciales y de toda actividad realizada
            con tu cuenta.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Conductas no permitidas
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Acceder o intentar acceder a información de otros usuarios sin autorización.</li>
            <li>Interferir con la operación, seguridad o disponibilidad del Servicio.</li>
            <li>Usar el Servicio con fines distintos a la gestión educativa.</li>
            <li>Copiar, modificar o distribuir el software sin autorización escrita.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            4. Propiedad intelectual
          </h2>
          <p className="mt-3">
            El software, el diseño, las marcas y los contenidos del Servicio
            son propiedad de SIIES o de sus licenciantes. El uso del Servicio
            no otorga ningún derecho de propiedad sobre ellos. La información
            académica pertenece a la institución educativa y a los titulares de
            los datos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Disponibilidad y cambios
          </h2>
          <p className="mt-3">
            Trabajamos para mantener el Servicio disponible de forma continua;
            sin embargo, puede haber interrupciones por mantenimiento o causas
            de fuerza mayor. Podemos actualizar o modificar funcionalidades
            para mejorar el Servicio.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            6. Limitación de responsabilidad
          </h2>
          <p className="mt-3">
            SIIES no será responsable por daños derivados del uso indebido del
            Servicio, de la pérdida de credenciales atribuible al usuario, ni
            de interrupciones ocasionadas por terceros o causas fuera de
            nuestro control razonable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Privacidad
          </h2>
          <p className="mt-3">
            El tratamiento de los datos personales se rige por nuestro{" "}
            <a
              href="/privacidad"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Aviso de privacidad
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            8. Contacto
          </h2>
          <p className="mt-3">
            Para cualquier duda sobre estos términos, escríbenos a{" "}
            <a
              href="mailto:soporte@siies.app"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              soporte@siies.app
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
