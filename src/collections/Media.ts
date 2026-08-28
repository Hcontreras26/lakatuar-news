import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo Multimedia',
    plural: 'Archivos Multimedia',
  },
  access: {
    read: () => true, // Permite acceso público para que el frontend pueda mostrar las imágenes
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: 675,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto Alternativo (Alt Text - Accesibilidad y SEO)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Leyenda / Créditos de la foto',
    },
  ],
};
