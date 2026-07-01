import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AulaProvider } from "@/components/aula/AulaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SIIES — Sistema Integral de Información Educativa",
    template: "%s | SIIES",
  },
  description:
    "SIIES es la plataforma integral para la gestión educativa: control escolar, horarios, calificaciones y comunicación, todo en un solo lugar.",
  keywords: [
    "SIIES",
    "gestión escolar",
    "control escolar",
    "horarios escolares",
    "plataforma educativa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <AulaProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AulaProvider>
      </body>
    </html>
  );
}
