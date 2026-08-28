"use client";

import React, { useState } from "react";

export type RequestTypeId = "denuncia" | "prensa" | "publicidad" | "general";

export interface RequestTypeOption {
  readonly id: RequestTypeId;
  readonly label: string;
}

export interface ContactFormData {
  requestType: RequestTypeId;
  name: string;
  contactInfo: string;
  subject: string;
  message: string;
  evidenceUrl: string;
  isAnonymous: boolean;
}

const REQUEST_TYPES: readonly RequestTypeOption[] = [
  { id: "denuncia", label: "Denuncia" },
  { id: "prensa", label: "Prensa" },
  { id: "publicidad", label: "Publicidad" },
  { id: "general", label: "General" },
];

const INITIAL_STATE: ContactFormData = {
  requestType: "denuncia",
  name: "",
  contactInfo: "",
  subject: "",
  message: "",
  evidenceUrl: "",
  isAnonymous: false,
};

export default function ContactForm(): React.JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeSelect = (typeId: RequestTypeId) => {
    setFormData((prev) => ({ ...prev, requestType: typeId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!formData.isAnonymous && !formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor ingresa tu nombre o activa la opción de fuente anónima.");
      return;
    }

    if (!formData.subject.trim()) {
      setStatus("error");
      setErrorMessage("Por favor ingresa el asunto de tu comunicación.");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Por favor escribe el detalle de tu mensaje.");
      return;
    }

    try {
      const res = await fetch("/api/denuncias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo enviar la comunicación.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Ocurrió un error inesperado al enviar.";
      setErrorMessage(msg);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="rounded border border-zinc-800 bg-zinc-950 p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600/10 text-red-500">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white">
          Mensaje Recibido
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          Tu comunicación ha sido remitida al equipo de redacción y producción.
        </p>
        {formData.isAnonymous && (
          <p className="mt-2 text-[11px] font-medium text-red-400">
            Protocolo de anonimato activado para este envío.
          </p>
        )}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[38px] items-center justify-center rounded border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded border border-red-800/60 bg-red-950/40 p-3 text-xs text-red-200">
          {errorMessage}
        </div>
      )}

      {/* Selector de Categoría / Tipo */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Categoría
        </label>
        <div className="flex flex-wrap gap-2">
          {REQUEST_TYPES.map((type) => {
            const isSelected = formData.requestType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelect(type.id)}
                className={`min-h-[38px] rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "border border-red-500 bg-red-600 text-white shadow-md shadow-red-950/40"
                    : "border border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Asunto *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Tema o título del mensaje"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner transition-all focus:border-red-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      {/* Detalle del Mensaje */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe con claridad los hechos, solicitud o propuesta..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner transition-all focus:border-red-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      {/* Enlace a Evidencias / Documentos */}
      <div>
        <label htmlFor="evidenceUrl" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
          Enlace a Documentos o Archivos (Opcional)
        </label>
        <input
          type="url"
          id="evidenceUrl"
          name="evidenceUrl"
          value={formData.evidenceUrl}
          onChange={handleChange}
          placeholder="https://drive.google.com/... o enlace de descarga"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner transition-all focus:border-red-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      {/* Modo de Identidad / Reserva de Fuente */}
      <div className="rounded-lg border border-zinc-700/80 bg-zinc-950 p-4 shadow-sm">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
          />
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-200">
              Enviar como Fuente Anónima
            </span>
            <span className="mt-0.5 block text-xs text-zinc-400">
              Activa la reserva estricta de identidad. No se requerirá nombre identificativo.
            </span>
          </div>
        </label>
      </div>

      {/* Datos de Contacto (Condicional según anonimato) */}
      {!formData.isAnonymous && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
              Nombre o Seudónimo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required={!formData.isAnonymous}
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner transition-all focus:border-red-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-300">
              Correo o Teléfono
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com o +1..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner transition-all focus:border-red-500 focus:bg-black focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>
      )}

      {/* Botón de Enviar */}
      <div className="flex items-center justify-end pt-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/60 transition-all hover:bg-red-500 hover:shadow-red-900/60 active:bg-red-700 disabled:opacity-50 sm:w-auto"
        >
          {status === "submitting" ? (
            <span>Enviando información...</span>
          ) : (
            <>
              <span>Enviar Mensaje</span>
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
