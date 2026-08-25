import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import DenunciasBanner from "@/components/ui/DenunciasBanner";

export const metadata: Metadata = {
  title: "Contacto y Denuncias | LA KATUAR NEWS",
  description:
    "Comunícate con el equipo editorial de La Katuar News. Envío seguro de denuncias ciudadanas, notas de prensa y alianzas comerciales con Jessica Vallenilla.",
};

const directChannels = [
  {
    title: "Canal de Denuncias Confidenciales",
    badge: "100% Confidencial",
    badgeColor: "bg-red-600 text-white",
    description:
      "Línea protegida para envío de información sensible, documentos, audios y videos con estricta reserva de la fuente.",
    contactText: "+1 (786) 000-KATUAR / WhatsApp",
    contactHref: "https://whatsapp.com",
    icon: (
      <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Sala de Redacción & Prensa",
    badge: "Coberturas",
    badgeColor: "bg-red-950 text-red-300 border border-red-800/40",
    description:
      "Para comunicados oficiales, notas de prensa, sugerencias de temas y contacto con el equipo de periodistas.",
    contactText: "redaccion@lakatuar.com",
    contactHref: "mailto:redaccion@lakatuar.com",
    icon: (
      <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
  {
    title: "Publicidad & Alianzas Comerciales",
    badge: "Sponsorships",
    badgeColor: "bg-zinc-900 text-zinc-300 border border-zinc-700/50",
    description:
      "Patrocinios en el programa 'En La Mira', menciones publicitarias, pautas en el portal web y campañas multiplataforma.",
    contactText: "comercial@lakatuar.com",
    contactHref: "mailto:comercial@lakatuar.com",
    icon: (
      <svg className="h-6 w-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "¿Cómo garantizan el anonimato de las fuentes periodísticas?",
    a: "En La Katuar News protegemos la identidad de nuestras fuentes bajo el principio constitucional y deontológico del secreto profesional periodístico. Si marcas la opción de anonimato, tus datos identificativos no serán publicados ni compartidos bajo ninguna circunstancia.",
  },
  {
    q: "¿Qué formato de evidencias se pueden enviar?",
    a: "Puedes compartir documentos en PDF, capturas de pantalla, audios, fotografías y enlaces a carpetas seguras en la nube (Google Drive, OneDrive, Dropbox, WeTransfer).",
  },
  {
    q: "¿Cuándo se transmite el programa 'En La Mira' en vivo?",
    a: "El programa estelar conducido por Jessica Vallenilla ('La Katuar') se transmite en vivo de Lunes a Viernes desde la 1:15 PM (hora Venezuela / Miami) a través de YouTube y nuestro portal oficial.",
  },
];

export default function ContactoPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#120404] text-white flex flex-col justify-between">
      <Header />

      <div className="relative overflow-hidden bg-gradient-to-b from-[#85020b] via-[#480207] to-[#120404] text-white flex-1">
        {/* Radial overlay glow identical to Hero Section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.09),transparent_60%)]"
        />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-xs text-red-200/80">
            <Link href="/" className="transition hover:text-white">
              Inicio
            </Link>
            <span className="text-red-300/50">/</span>
            <span className="font-semibold text-white">Contacto y Denuncias</span>
          </nav>

          {/* Hero Section */}
          <div className="relative mb-12 overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-b from-[#85020b] via-[#630108] to-[#340104] p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-56 w-56 rounded-full bg-red-400/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                <span>CANAL DE COMUNICACIÓN OFICIAL</span>
              </div>

              <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Contacto & Denuncias
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-zinc-200 sm:text-base">
                La Katuar News es una plataforma de periodismo sin censura, sin filtros y con la verdad.
                Si tienes una denuncia, filtración, propuesta informativa o interés comercial,
                este es tu canal directo de comunicación.
              </p>
            </div>
          </div>

          {/* Main Content Grid: Direct Channels (Left) + Form (Right) */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-12">
            {/* Tarjetas Informativas de Canales Directos */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-xl border border-red-700/40 bg-[#250306]/85 p-5 backdrop-blur-md shadow-xl">
                <h2 className="text-xs font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Vías Directas de Contacto
                </h2>

                <div className="space-y-4">
                  {directChannels.map((ch) => (
                    <div
                      key={ch.title}
                      className="rounded-xl border border-red-800/40 bg-[#35050a]/75 p-4 transition duration-200 hover:border-red-500/60 hover:bg-[#45070d]/85 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="rounded-lg bg-black/40 p-2 border border-red-900/60">
                            {ch.icon}
                          </div>
                          <h3 className="text-sm font-bold text-white">{ch.title}</h3>
                        </div>
                        <span className={`rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${ch.badgeColor}`}>
                          {ch.badge}
                        </span>
                      </div>

                      <p className="mt-2.5 text-xs text-zinc-300 leading-relaxed">
                        {ch.description}
                      </p>

                      <div className="mt-3 border-t border-red-800/30 pt-2.5">
                        <a
                          href={ch.contactHref}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 transition hover:text-red-300 hover:underline"
                        >
                          <span>{ch.contactText}</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="rounded-xl border border-red-800/40 bg-[#200305]/85 p-5 shadow-xl backdrop-blur-md">
                <h3 className="text-xs font-black uppercase tracking-wider text-red-300 mb-3">
                  Sigue las Redes Oficiales
                </h3>
                <p className="text-xs text-zinc-300 mb-4">
                  Mantente al día con reportajes al minuto y alertas informativas:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-red-800/50 bg-[#2d0408] px-3 py-2 text-zinc-100 transition hover:border-red-400 hover:bg-[#3d060b] hover:text-white"
                  >
                    <span className="text-red-500 font-bold">▶</span> YouTube
                  </a>
                  <a
                    href="https://instagram.com/la_katuar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-red-800/50 bg-[#2d0408] px-3 py-2 text-zinc-100 transition hover:border-red-400 hover:bg-[#3d060b] hover:text-white"
                  >
                    <span className="text-pink-500 font-bold">📷</span> Instagram
                  </a>
                  <a
                    href="https://x.com/la_katuar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-red-800/50 bg-[#2d0408] px-3 py-2 text-zinc-100 transition hover:border-red-400 hover:bg-[#3d060b] hover:text-white"
                  >
                    <span className="text-white font-bold">𝕏</span> X (Twitter)
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-red-800/50 bg-[#2d0408] px-3 py-2 text-zinc-100 transition hover:border-red-400 hover:bg-[#3d060b] hover:text-white"
                  >
                    <span className="text-cyan-400 font-bold">🎵</span> TikTok
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario Interactivo de Contacto y Denuncias */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Banner de Denuncias con Horarios de Transmisión */}
          <div className="my-10">
            <DenunciasBanner scheduleText="LUNES A VIERNES" timeText="DESDE LA 1:15 PM (HORA VENEZUELA)" />
          </div>

          {/* Preguntas Frecuentes */}
          <div className="mt-12 rounded-2xl border border-red-800/40 bg-[#1d0305]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                GUÍA DE ENVÍO
              </span>
              <h2 className="mt-2 text-xl font-black uppercase text-white sm:text-2xl">
                Preguntas Frecuentes sobre Denuncias
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-red-900/50 bg-[#2a0407]/75 p-4 transition hover:border-red-600/60 shadow-md"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-200">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
