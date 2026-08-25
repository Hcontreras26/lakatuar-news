"use client";

import React, { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  requestType: "denuncia" | "prensa" | "publicidad" | "opinion" | "otro";
  subject: string;
  message: string;
  evidenceUrl: string;
  isAnonymous: boolean;
}

export default function ContactForm(): React.JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    requestType: "denuncia",
    subject: "",
    message: "",
    evidenceUrl: "",
    isAnonymous: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Validación básica
    if (!formData.name.trim() && !formData.isAnonymous) {
      setStatus("error");
      setErrorMessage("Por favor ingresa tu nombre o activa la opción de anonimato.");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Por favor escribe tu mensaje o detalle de la solicitud.");
      return;
    }

    // Simulación de envío seguro
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      requestType: "denuncia",
      subject: "",
      message: "",
      evidenceUrl: "",
      isAnonymous: false,
    });
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-gradient-to-b from-[#1f0707] to-[#120404] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-500 ring-2 ring-red-500/30">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black uppercase tracking-wider text-white sm:text-2xl">
          ¡Mensaje Recibido!
        </h3>
        <p className="mt-2 text-sm text-zinc-300">
          Tu mensaje ha sido remitido al equipo de redacción y producción de{" "}
          <span className="font-bold text-red-400">LA KATUAR NEWS</span>.
        </p>
        {formData.isAnonymous && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-300">
            <svg className="h-4 w-4 fill-red-400" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            Protocolo de protección y anonimato activado para esta denuncia.
          </div>
        )}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/40 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-red-900/50 bg-gradient-to-b from-[#1c0606] via-[#140404] to-[#0f0303] p-6 text-white shadow-2xl sm:p-8"
    >
      <div className="mb-6 border-b border-red-900/40 pb-4">
        <span className="inline-block rounded bg-red-600/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-800/40">
          Formulario de Contacto
        </span>
        <h3 className="mt-2 text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
          Escríbenos Directamente
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          Completa el siguiente formulario para denuncias, coberturas, notas de prensa o consultas.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-950/50 p-3 text-xs text-red-200">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Tipo de Solicitud */}
        <div className="sm:col-span-2">
          <label
            htmlFor="requestType"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Tipo de Solicitud *
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="denuncia">🚨 Denuncia Ciudadana / Filtración de Información</option>
            <option value="prensa">📰 Nota de Prensa / Cobertura Periodística</option>
            <option value="publicidad">💼 Publicidad / Patrocinios y Alianzas</option>
            <option value="opinion">🎙️ Comentario sobre el Programa / Opinión</option>
            <option value="otro">✉️ Consulta General</option>
          </select>
        </div>

        {/* Nombre */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Nombre Completo {formData.isAnonymous ? "(Opcional)" : "*"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            disabled={formData.isAnonymous}
            value={formData.isAnonymous ? "Fuente Anónima" : formData.name}
            onChange={handleChange}
            placeholder="Tu nombre o seudónimo"
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Teléfono / WhatsApp */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Teléfono o WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Asunto */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Asunto / Título de la Denuncia *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Resumen del caso o tema"
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Mensaje / Detalle */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Detalle del Mensaje o Hechos *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe con claridad los hechos, lugares, fechas o personas involucradas..."
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Enlace a pruebas o archivos */}
        <div className="sm:col-span-2">
          <label
            htmlFor="evidenceUrl"
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1"
          >
            Enlace a Evidencias / Archivos (Google Drive, Dropbox, Video, etc.)
          </label>
          <input
            type="url"
            id="evidenceUrl"
            name="evidenceUrl"
            value={formData.evidenceUrl}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full rounded-lg border border-red-900/60 bg-[#120404] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
          <p className="mt-1 text-[11px] text-zinc-400">
            Puedes compartir carpetas o enlaces de video/fotos protegidas.
          </p>
        </div>

        {/* Checkbox Anonimato */}
        <div className="sm:col-span-2 pt-2">
          <label className="flex items-start gap-3 rounded-lg border border-red-950 bg-[#170404]/80 p-3 cursor-pointer transition hover:border-red-800">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-red-700 bg-black text-red-600 focus:ring-red-500 focus:ring-offset-0"
            />
            <div className="text-xs">
              <span className="font-bold text-white block">
                🔒 Solicito estricto anonimato y reserva de mi identidad
              </span>
              <span className="text-zinc-400 text-[11px]">
                Garantizamos la confidencialidad de la fuente según el código deontológico del periodismo.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Botón de Enviar */}
      <div className="mt-6 flex items-center justify-end border-t border-red-900/40 pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-red-600 px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-red-950/50 transition duration-200 hover:bg-red-700 hover:shadow-red-800/40 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
        >
          {status === "submitting" ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enviando de forma segura...
            </>
          ) : (
            <>
              <span>Enviar Información</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
