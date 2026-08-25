import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Términos y Condiciones | LA KATUAR NEWS",
  description:
    "Términos y condiciones de uso de la plataforma digital LA KATUAR NEWS, operada por La Katuar, LLC. Conoce tus derechos, obligaciones y el marco normativo de nuestro portal de noticias.",
};

const sections = [
  { id: "aceptacion", title: "Aceptación de los Términos de Uso" },
  { id: "naturaleza", title: "Naturaleza Periodística y Libertad de Información" },
  { id: "propiedad", title: "Propiedad Intelectual y Derechos de Autor" },
  { id: "uso-permitido", title: "Uso Permitido y Prohibiciones" },
  { id: "contenido-usuario", title: "Envíos de Usuarios y Denuncias Ciudadanas" },
  { id: "exencion", title: "Exención y Limitación de Responsabilidad" },
  { id: "enlaces-terceros", title: "Enlaces a Sitios y Plataformas de Terceros" },
  { id: "jurisdiccion", title: "Ley Aplicable y Jurisdicción" },
  { id: "modificaciones", title: "Modificaciones y Contacto Corporativo" },
];

export default function TerminosPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#120404] text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 w-full">
        <LegalPageLayout
          title="Términos y Condiciones"
          subtitle="Bienvenido a LA KATUAR NEWS. Al navegar o utilizar nuestro portal, usted acepta y se compromete a cumplir con los siguientes términos y condiciones de uso."
          badge="TÉRMINOS Y CONDICIONES"
          lastUpdated="Febrero 2026"
          sections={sections}
        >
          {/* 1. Aceptación */}
          <section id="aceptacion" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">01.</span> Aceptación de los Términos de Uso
            </h2>
            <p>
              Los presentes Términos y Condiciones regulan el acceso y uso del sitio web <strong className="text-white">LA KATUAR NEWS</strong>, accesible desde cualquier dispositivo, operado por <strong className="text-white">La Katuar, LLC</strong>.
            </p>
            <p>
              El acceso, navegación o consulta de cualquier contenido, artículo, transmisión en directo o video on demand en este portal implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este documento. Si no está de acuerdo con alguno de estos términos, deberá abstenerse de utilizar el portal.
            </p>
          </section>

          {/* 2. Naturaleza Periodística */}
          <section id="naturaleza" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">02.</span> Naturaleza Periodística y Libertad de Información
            </h2>
            <div className="rounded-xl border border-red-600/40 bg-gradient-to-r from-[#200507] to-[#120304] p-4 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider mb-1.5">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                Compromiso Informativo y Editorial
              </div>
              <p className="text-zinc-200">
                LA KATUAR NEWS es un medio de comunicación independiente dedicado al análisis, investigación y difusión de noticias de interés público, conducido bajo la dirección de la periodista Jessica Vallenilla (&quot;La Katuar&quot;). Nuestros contenidos se fundamentan en el ejercicio legítimo de la libertad de expresión y el derecho universal a la información veraz.
              </p>
            </div>
          </section>

          {/* 3. Propiedad Intelectual */}
          <section id="propiedad" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">03.</span> Propiedad Intelectual y Derechos de Autor
            </h2>
            <p>
              Todos los elementos que componen este portal web, incluyendo sin limitación: textos, diseño gráfico, logotipos, marcas comerciales (&quot;LA KATUAR NEWS&quot;, &quot;EN LA MIRA&quot;), producciones audiovisuales, audios, fotografías, software, interfaces y código fuente, son propiedad exclusiva de <strong className="text-white">La Katuar, LLC</strong> o de sus respectivos titulares de derechos bajo licencia.
            </p>
            <p>
              Queda estrictamente prohibida la reproducción, distribución, comunicación pública, transformación o explotación comercial no autorizada de cualquier contenido de este portal sin el consentimiento previo y por escrito de La Katuar, LLC, salvo para citas informativas con la debida atribución de la fuente original.
            </p>
          </section>

          {/* 4. Uso Permitido */}
          <section id="uso-permitido" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">04.</span> Uso Permitido y Prohibiciones
            </h2>
            <p>Al utilizar este sitio web, el usuario se compromete a abstenerse de:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-300">
              <li>Realizar extracción masiva de datos no autorizada (scraping o minería de datos automatizada) que afecte la estabilidad del servidor.</li>
              <li>Intentar vulnerar las medidas de seguridad, autenticación o cortafuegos de la plataforma.</li>
              <li>Introducir virus, malware, troyanos o cualquier otro código malicioso.</li>
              <li>Utilizar el portal para fines ilícitos, fraudulentos, difamatorios o que atenten contra derechos de terceros.</li>
              <li>Suplantar la identidad de cualquier persona o entidad vinculada a La Katuar News.</li>
            </ul>
          </section>

          {/* 5. Contenido de Usuarios y Denuncias */}
          <section id="contenido-usuario" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">05.</span> Envíos de Usuarios y Denuncias Ciudadanas
            </h2>
            <p>
              Los usuarios que envíen material, información, documentos o evidencias mediante los formularios de denuncia garantizan que la información aportada es veraz en la medida de su conocimiento y que poseen la legítima capacidad para remitirla.
            </p>
            <p>
              El envío de material no obliga a La Katuar News a su publicación obligatoria, reservándose la redacción el derecho exclusivo de investigar, corroborar y determinar la relevancia periodística del material aportado.
            </p>
          </section>

          {/* 6. Exención */}
          <section id="exencion" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">06.</span> Exención y Limitación de Responsabilidad
            </h2>
            <p>
              La Katuar News realiza esfuerzos razonables para garantizar la exactitud, actualidad y disponibilidad ininterrumpida de los contenidos publicados. No obstante, no podemos garantizar la ausencia total de errores tipográficos o interrupciones técnicas temporales atribuibles a fallos de proveedores de infraestructura, redes de telecomunicaciones o causas de fuerza mayor.
            </p>
            <p>
              Las opiniones expresadas por analistas, entrevistados o panelistas invitados en los programas y transmisiones son de su exclusiva responsabilidad y no representan necesariamente la postura institucional de La Katuar, LLC.
            </p>
          </section>

          {/* 7. Enlaces Terceros */}
          <section id="enlaces-terceros" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">07.</span> Enlaces a Sitios y Plataformas de Terceros
            </h2>
            <p>
              Este sitio web puede contener enlaces que redirigen a plataformas y redes sociales externas (YouTube, X, Instagram, Facebook, TikTok). La Katuar, LLC no ejerce control sobre los contenidos, políticas o términos de dichas plataformas de terceros y declina toda responsabilidad derivada del uso de los mismos.
            </p>
          </section>

          {/* 8. Jurisdicción */}
          <section id="jurisdiccion" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">08.</span> Ley Aplicable y Jurisdicción
            </h2>
            <p>
              Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes vigentes aplicables a las empresas de comunicación digital constituidas bajo la jurisdicción corporativa de <strong className="text-white">La Katuar, LLC</strong>.
            </p>
            <p>
              Cualquier controversia derivada de la interpretación o ejecución de estos términos será sometida preferentemente a mecanismos de mediación previa o a los tribunales competentes de dicha jurisdicción.
            </p>
          </section>

          {/* 9. Modificaciones */}
          <section id="modificaciones" className="scroll-mt-28 space-y-3">
            <h2 className="text-lg font-black uppercase text-white tracking-wide flex items-center gap-2 border-b border-red-900/30 pb-2">
              <span className="text-red-500 font-mono">09.</span> Modificaciones y Contacto Corporativo
            </h2>
            <p>
              La Katuar, LLC se reserva el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento. La fecha de la última actualización se indicará en el encabezado del documento.
            </p>
            <p className="text-xs text-zinc-400 pt-2">
              Para consultas legales, licencias de contenido o aclaraciones: <strong className="text-red-400">legal@lakatuar.com</strong>
            </p>
          </section>
        </LegalPageLayout>
      </main>

      <Footer />
    </div>
  );
}
