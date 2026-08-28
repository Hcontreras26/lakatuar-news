import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio y En Vivo',
  access: {
    read: () => true, // Acceso público para el frontend
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '📺 Transmisión En Vivo (Hero)',
          fields: [
            {
              name: 'isLive',
              type: 'checkbox',
              label: '🔴 ¿Estamos transmitiendo EN VIVO ahora mismo?',
              defaultValue: false,
            },
            {
              name: 'liveTitle',
              type: 'text',
              label: 'Título de la Transmisión / Programa',
              defaultValue: 'LA KATUAR NEWS: Edición Central',
            },
            {
              name: 'liveSchedule',
              type: 'text',
              label: 'Horario del Programa (Ej: Lunes a Viernes 8:00 PM)',
              defaultValue: 'Lunes a Viernes 8:00 PM EST',
            },
            {
              name: 'liveUrl',
              type: 'text',
              label: 'URL del Video o Transmisión de YouTube (Live Stream URL o ID)',
            },
            {
              name: 'presenterName',
              type: 'text',
              label: 'Nombre del Presentador(a)',
              defaultValue: 'Edith (La Katuar)',
            },
            {
              name: 'presenterBio',
              type: 'text',
              label: 'Rol o Descripción Corta',
              defaultValue: 'Periodista & Directora Editorial',
            },
          ],
        },
        {
          label: '📞 Contacto y Redes Sociales',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Correo Electrónico de Contacto',
              defaultValue: 'contacto@lakatuar.com',
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'Número de WhatsApp para Denuncias (Con código de país)',
              defaultValue: '+1 (555) 000-0000',
            },
            {
              name: 'xUrl',
              type: 'text',
              label: 'Perfil de X (Twitter)',
              defaultValue: 'https://x.com/la_katuar',
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'Canal de YouTube',
              defaultValue: 'https://youtube.com/@la_katuar',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Cuenta de Instagram',
              defaultValue: 'https://instagram.com/la_katuar',
            },
            {
              name: 'tiktokUrl',
              type: 'text',
              label: 'Cuenta de TikTok',
              defaultValue: 'https://tiktok.com/@la_katuar',
            },
          ],
        },
        {
          label: '⚖️ Banners y Avisos',
          fields: [
            {
              name: 'denunciasBannerText',
              type: 'text',
              label: 'Texto del Banner de Denuncias',
              defaultValue: '¿Tienes una denuncia o información confidencial? Escríbenos de forma 100% segura.',
            },
            {
              name: 'announcementBanner',
              type: 'text',
              label: 'Barra de Alerta / Noticia de Último Minuto (Marquee superior)',
            },
          ],
        },
      ],
    },
  ],
};
