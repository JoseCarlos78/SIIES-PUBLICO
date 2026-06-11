import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de SIIES: cómo recabamos, usamos y protegemos tus datos personales.",
};

export default function Privacidad() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Aviso de privacidad
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Última actualización: 11 de junio de 2026
      </p>

      <div className="mt-10 space-y-10 leading-relaxed text-slate-600">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            1. Responsable del tratamiento
          </h2>
          <p className="mt-3">
            SIIES (en adelante, “nosotros”) es responsable del tratamiento de
            los datos personales que se recaban a través de la plataforma SIIES
            Web y de las aplicaciones móviles de SIIES, conforme a la Ley
            Federal de Protección de Datos Personales en Posesión de los
            Particulares y demás normatividad aplicable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            2. Datos que recabamos
          </h2>
          <p className="mt-3">
            Para prestar nuestros servicios podemos recabar los siguientes
            datos personales:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Datos de identificación: nombre, matrícula y fotografía.</li>
            <li>Datos de contacto: correo electrónico y número telefónico.</li>
            <li>
              Datos académicos: historial escolar, calificaciones, horarios,
              grupos y asistencias.
            </li>
            <li>
              Datos de uso de la plataforma: registros de acceso e información
              técnica del dispositivo necesaria para la operación del servicio.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Finalidades del tratamiento
          </h2>
          <p className="mt-3">Utilizamos los datos personales para:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Operar los servicios de gestión escolar contratados por la institución educativa.</li>
            <li>Generar documentos académicos oficiales (boletas, kárdex, constancias).</li>
            <li>Comunicar avisos institucionales a alumnos, docentes y familias.</li>
            <li>Brindar soporte técnico y mejorar la plataforma.</li>
            <li>Cumplir obligaciones legales y requerimientos de autoridades competentes.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            4. Transferencias de datos
          </h2>
          <p className="mt-3">
            No vendemos ni compartimos datos personales con terceros con fines
            comerciales. Los datos solo se comparten con la institución
            educativa a la que pertenece el titular, con proveedores de
            infraestructura tecnológica necesarios para operar el servicio, y
            con autoridades cuando exista una obligación legal.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Medidas de seguridad
          </h2>
          <p className="mt-3">
            Implementamos medidas de seguridad administrativas, técnicas y
            físicas para proteger los datos personales: transmisión cifrada,
            controles de acceso por rol, respaldos periódicos y monitoreo de la
            plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            6. Derechos ARCO
          </h2>
          <p className="mt-3">
            El titular de los datos (o su madre, padre o tutor en caso de
            menores de edad) puede ejercer en todo momento sus derechos de
            Acceso, Rectificación, Cancelación y Oposición (ARCO), así como
            revocar su consentimiento, enviando una solicitud al correo{" "}
            <a
              href="mailto:privacidad@siies.app"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              privacidad@siies.app
            </a>
            . Responderemos en los plazos que marca la ley.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Conservación de los datos
          </h2>
          <p className="mt-3">
            Los datos se conservan mientras exista la relación con la
            institución educativa y durante los plazos exigidos por la
            normatividad académica aplicable. Concluidos dichos plazos, los
            datos se eliminan o anonimizan de forma segura.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            8. Cambios a este aviso
          </h2>
          <p className="mt-3">
            Este aviso puede actualizarse para reflejar cambios legales u
            operativos. Cualquier modificación se publicará en esta página
            indicando la fecha de última actualización.
          </p>
        </div>
      </div>
    </section>
  );
}
