import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidad | LA KATUAR NEWS",
  description:
    "Política de Privacidad de La Katuar News y La Katuar, LLC. Conoce cómo protegemos tus datos, el uso de cookies y nuestro estricto protocolo de protección de fuentes periodísticas.",
};

const sections = [
  { id: "compromiso", title: "Compromiso General y Responsable" },
  { id: "fuentes", title: "Protección de Fuentes y Denuncias" },
  { id: "datos", title: "Información que Recopilamos" },
  { id: "finalidad", title: "Finalidad del Tratamiento" },
  { id: "cookies", title: "Cookies y Tecnologías de Analítica" },
  { id: "terceros", title: "Integraciones de Terceros (YouTube, X, Redes)" },
  { id: "derechos", title: "Tus Derechos (Acceso, Rectificación y Supresión)" },
  { id: "seguridad", title: "Seguridad y Medidas Técnicas" },
  { id: "contacto-legal", title: "Modificaciones y Contacto Legal" },
];

export default function PrivacidadPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#120404] text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 w-full">
        <LegalPageLayout
          title="Política de Privacidad"
          subtitle="En LA KATUAR NEWS nos tomamos con la máxima seriedad la protección de tu privacidad, la seguridad de tus datos y la reserva irrestricta de las fuentes periodísticas."
          badge="POLÍTICA DE PRIVACIDAD"
          lastUpdated="Febrero 2026"
          sections={sections}
        >
          {/* 1. Compromiso */}
          <section id="compromiso" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">01.</span> Compromiso General y Responsable del Tratamiento
            </h2>
            <p>
              El presente portal web <strong className="text-white">LA KATUAR NEWS</strong> es operado y administrado por <strong className="text-white">La Katuar, LLC</strong> (en adelante &quot;nosotros&quot;, &quot;nuestro&quot; o &quot;La Katuar&quot;), con el liderazgo periodístico de Jessica Vallenilla.
            </p>
            <p>
              Esta Política de Privacidad describe los tipos de información que podemos recopilar de usted o que usted puede proporcionar cuando visita nuestro portal web, utiliza nuestros formularios interactivos de contacto y denuncias, o interactúa con nuestros contenidos y transmisiones en vivo.
            </p>
          </section>

          {/* 2. Protección de Fuentes */}
          <section id="fuentes" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">02.</span> Protección Rigurosa de Fuentes Periodísticas y Denunciantes Anónimos
            </h2>
            <div className="rounded-xl border border-red-500/40 bg-gradient-to-r from-[#630108] via-[#480206] to-[#2b0204] p-4 text-xs shadow-lg">
              <div className="flex items-center gap-2 text-red-300 font-bold uppercase tracking-wider mb-1.5">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                Principio de Confidencialidad Absoluta
              </div>
              <p className="text-zinc-100">
                La libertad de prensa y el derecho a la información exigen la protección irrestricta de las fuentes informativas. Toda información enviada a través de nuestros canales de denuncia con solicitud de anonimato será tratada bajo rigurosos protocolos de confidencialidad y secreto profesional.
              </p>
            </div>
            <p>
              Cuando un usuario remite material sensible bajo la modalidad anónima:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-300">
              <li>No divulgaremos ni publicaremos datos que permitan identificar al remitente sin su autorización expresa.</li>
              <li>Los metadatos sensibles de archivos adjuntos (ubicación geográfica, EXIF de fotografías) son depurados durante el proceso de verificación interna.</li>
              <li>Las comunicaciones directas por canales encriptados se eliminan periódicamente tras su debida verificación.</li>
            </ul>
          </section>

          {/* 3. Datos que Recopilamos */}
          <section id="datos" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">03.</span> Información que Recopilamos
            </h2>
            <p>Recopilamos información de dos maneras principales:</p>
            <div className="space-y-3">
              <div className="rounded-xl bg-[#280407]/85 p-4 border border-red-800/50 shadow-md">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-red-300 mb-1">
                  A. Información que usted nos proporciona voluntariamente:
                </h3>
                <p className="text-xs text-zinc-200">
                  Nombre, dirección de correo electrónico, número telefónico o de WhatsApp, mensajes, enlaces a evidencias o archivos proporcionados al completar nuestros formularios de contacto, suscripción o denuncias.
                </p>
              </div>

              <div className="rounded-xl bg-[#280407]/85 p-4 border border-red-800/50 shadow-md">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-red-300 mb-1">
                  B. Información técnica y de navegación automatizada:
                </h3>
                <p className="text-xs text-zinc-200">
                  Dirección IP anónima, tipo de navegador, sistema operativo, páginas de referencia/salida, fecha y hora de acceso, y métricas agregadas de reproducción de video mediante cookies o scripts de analítica web.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Finalidad */}
          <section id="finalidad" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">04.</span> Finalidad del Tratamiento de los Datos
            </h2>
            <p>Utilizamos la información recopilada para las siguientes finalidades legítimas:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-300">
              <li>Gestionar y verificar las denuncias ciudadanas y solicitudes de cobertura informativa.</li>
              <li>Responder oportunamente a consultas periodísticas, comerciales y de patrocinio.</li>
              <li>Garantizar el correcto funcionamiento, seguridad y estabilidad de la plataforma web.</li>
              <li>Optimizar la distribución de contenidos de video On Demand y transmisiones en vivo.</li>
              <li>Cumplir con obligaciones legales aplicables y prevenir fraudes o ataques cibernéticos.</li>
            </ul>
          </section>

          {/* 5. Cookies */}
          <section id="cookies" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">05.</span> Cookies y Tecnologías de Analítica
            </h2>
            <p>
              Utilizamos cookies técnicas estrictamente necesarias para el funcionamiento del portal y cookies analíticas para comprender cómo interactúan los visitantes con nuestros artículos y transmisiones.
            </p>
            <p>
              Usted puede configurar su navegador para rechazar todas o algunas cookies, o para que le avise cuando los sitios web instalen o accedan a las mismas. Si deshabilita las cookies, algunas funciones interactivas del portal podrían no estar disponibles.
            </p>
          </section>

          {/* 6. Terceros */}
          <section id="terceros" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">06.</span> Integraciones de Terceros (YouTube, X, Instagram, TikTok)
            </h2>
            <p>
              Nuestro portal incorpora reproductores de video incrustados de <strong className="text-white">YouTube (Google LLC)</strong>, feeds de publicaciones de <strong className="text-white">X (Twitter)</strong> e <strong className="text-white">Instagram (Meta Platforms, Inc.)</strong>.
            </p>
            <p>
              Al interactuar con estos elementos incrustados, dichos proveedores pueden recopilar datos de conformidad con sus respectivas políticas de privacidad independientes, las cuales le recomendamos consultar.
            </p>
          </section>

          {/* 7. Derechos */}
          <section id="derechos" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">07.</span> Tus Derechos (Acceso, Rectificación y Supresión)
            </h2>
            <p>
              De conformidad con los estándares internacionales de protección de datos (como el RGPD y normativas aplicables en los EE.UU.), usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-300">
              <li>Solicitar acceso a los datos personales que conservemos sobre usted.</li>
              <li>Solicitar la rectificación o corrección de datos inexactos.</li>
              <li>Solicitar la supresión o eliminación de sus datos de nuestras bases de contacto.</li>
              <li>Oponerse o limitar el tratamiento de sus datos con fines específicos.</li>
            </ul>
            <p className="text-xs text-zinc-400">
              Para ejercer cualquiera de estos derechos, puede escribirnos a <strong className="text-red-400">legal@lakatuar.com</strong> o mediante nuestra página de contacto.
            </p>
          </section>

          {/* 8. Seguridad */}
          <section id="seguridad" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">08.</span> Medidas Técnicas de Seguridad y Cifrado
            </h2>
            <p>
              Hemos implementado protocolos de cifrado SSL/TLS de 256 bits para todas las transmisiones de datos entre su navegador y nuestros servidores, así como políticas de acceso restringido a las bases de datos de recepción de información.
            </p>
          </section>

          {/* 9. Contacto Legal */}
          <section id="contacto-legal" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">09.</span> Modificaciones y Contacto Legal
            </h2>
            <p>
              Nos reservamos el derecho de actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas editoriales o en los requisitos normativos vigentes. Cualquier actualización será publicada en esta misma página con la fecha de revisión correspondiente.
            </p>
            <p className="text-xs text-zinc-400 pt-2">
              Responsable Legal: <strong className="text-white">La Katuar, LLC</strong> — Correo electrónico: <strong className="text-red-400">legal@lakatuar.com</strong>
            </p>
          </section>
        </LegalPageLayout>
      </main>

      <Footer />
    </div>
  );
}
