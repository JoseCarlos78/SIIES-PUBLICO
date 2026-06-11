import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                S
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                SIIES
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-500">
              Sistema Integral de Información Educativa. Tecnología que
              simplifica la gestión escolar para instituciones, docentes,
              alumnos y familias.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explora</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-brand-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-slate-500 hover:text-brand-600">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="text-slate-500 hover:text-brand-600">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-slate-500 hover:text-brand-600">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-slate-500 hover:text-brand-600">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} SIIES. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
