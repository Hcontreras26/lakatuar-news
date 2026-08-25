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
    "Canal oficial de contacto y denuncias confidenciales de La Katuar News. Periodismo de investigación y alianzas.",
};

interface DirectChannel {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly contactText: string;
  readonly contactHref: string;
  readonly icon: React.JSX.Element;
}

interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: React.JSX.Element;
}

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

const DIRECT_CHANNELS: readonly DirectChannel[] = [
  {
    title: "Denuncias Confidenciales",
    category: "Línea Segura",
    description: "Recepción de documentos, audios y material sensible bajo reserva de fuente.",
    contactText: "+1 (786) 000-KATUAR",
    contactHref: "https://wa.me/17860000000",
    icon: (
      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Redacción y Prensa",
    category: "Editorial",
    description: "Comunicados oficiales, notas de prensa y coberturas de actualidad.",
    contactText: "redaccion@lakatuar.com",
    contactHref: "mailto:redaccion@lakatuar.com",
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    title: "Comercial y Patrocinios",
    category: "Publicidad",
    description: "Pautas publicitarias en portal web y en el programa en vivo 'En La Mira'.",
    contactText: "comercial@lakatuar.com",
    contactHref: "mailto:comercial@lakatuar.com",
    icon: (
      <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

const SOCIAL_NETWORKS: readonly SocialLink[] = [
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/la_katuar",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/la_katuar",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.73 1.53-.07 2.78-1.16 3.03-2.65.1-1.02.07-2.05.08-3.08V0c.04.02.04.02.04.02z" />
      </svg>
    ),
  },
];

const FAQS: readonly FAQItem[] = [
  {
    question: "¿Cómo garantizan el anonimato de las fuentes?",
    answer:
      "Protegemos la identidad de nuestras fuentes bajo el secreto profesional periodístico. Si solicitas anonimato, tus datos de contacto no se almacenan en servidores públicos ni se revelan en las publicaciones.",
  },
  {
    question: "¿Qué formato de evidencias se pueden adjuntar?",
    answer:
      "Documentos en formato PDF, imágenes, audios o enlaces a repositorios seguros (Google Drive, Dropbox, WeTransfer).",
  },
  {
    question: "¿Cuándo se transmite el programa 'En La Mira'?",
    answer:
      "De lunes a viernes a partir de la 1:15 PM (Hora Venezuela / Miami) a través de YouTube y nuestro portal.",
  },
];

export default function ContactoPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased">
      <Header />

      <main className="flex-1">
        {/* Contenedor principal con padding mobile-first */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          
          {/* Breadcrumbs editorial */}
          <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="font-medium text-zinc-200">Contacto</span>
          </nav>

          {/* Encabezado Editorial Compacto y Equilibrado */}
          <header className="mb-6 border-b border-zinc-800 pb-5 sm:mb-8 sm:pb-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              {/* Bloque Izquierdo: Título y descripción */}
              <div className="max-w-2xl">
                <div className="inline-block bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Canal Oficial
                </div>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Contacto & Denuncias
                </h1>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Línea directa para recepción de material confidencial, notas de prensa y alianzas comerciales.
                </p>
              </div>

              {/* Bloque Derecho: Indicadores rápidos para balance visual */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">En Vivo</span>
                    <span className="font-semibold text-zinc-200">Lun - Vie | 1:15 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-xs">
                  <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Seguridad</span>
                    <span className="font-semibold text-zinc-200">Reserva de Fuente</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Grid Principal: Canales a la izquierda, Formulario a la derecha */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Vías de contacto directas (Lista estructurada sin cajas dobles) */}
            <aside className="space-y-8 lg:col-span-5">
              <div>
                <h2 className="text-base font-medium uppercase tracking-widest text-zinc-400">
                  Vías Directas
                </h2>
                
                <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                  {DIRECT_CHANNELS.map((channel) => (
                    <li key={channel.title} className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {channel.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base font-semibold text-white">
                              {channel.title}
                            </h3>
                            <span className="text-[12px] font-medium uppercase tracking-wider text-zinc-400">
                              {channel.category}
                            </span>
                          </div>
                          <p className="mt-1 text-base leading-relaxed text-zinc-400">
                            {channel.description}
                          </p>
                          <a
                            href={channel.contactHref}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-normal text-red-500 transition-colors hover:text-red-400"
                          >
                            <span>{channel.contactText}</span>
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Redes Sociales: Botones accesibles de toque móvil */}
              <div>
                <h2 className="text-base font-medium uppercase tracking-widest text-zinc-400">
                  Redes Oficiales
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {SOCIAL_NETWORKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center gap-2.5 rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Formulario Principal con superficie contrastada y elevación editorial */}
            <section className="lg:col-span-7">
              <div className="rounded-xl border border-zinc-700/80 bg-zinc-900 p-5 shadow-2xl shadow-black/60 sm:p-7 lg:p-8 border-t-2 border-t-red-600">
                <div className="mb-6 border-b border-zinc-800 pb-4">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Envíanos un mensaje
                  </h2>
                  <p className="mt-1.5 text-xs text-zinc-300 sm:text-sm">
                    Completa los campos requeridos. Puedes solicitar confidencialidad explícita.
                  </p>
                </div>
                <ContactForm />
              </div>
            </section>
          </div>

          {/* Banner de Horarios de Transmisión */}
          <section className="my-10">
            <DenunciasBanner 
              scheduleText="LUNES A VIERNES" 
              timeText="DESDE LA 1:15 PM (HORA VENEZUELA)" 
            />
          </section>

          {/* Preguntas Frecuentes: Formato Acordeón Nativo (Optimizado para móvil) */}
          <section className="border-t border-zinc-800 pt-8 sm:pt-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
              Preguntas Frecuentes
            </h2>
            
            <div className="mt-4 divide-y divide-zinc-800 border-b border-zinc-800">
              {FAQS.map((faq, index) => (
                <details 
                  key={index} 
                  className="group py-4 transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-200 hover:text-white">
                    <span>{faq.question}</span>
                    <span className="ml-4 text-xs text-zinc-500 transition-transform duration-200 group-open:rotate-180">
                      &#9660;
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}