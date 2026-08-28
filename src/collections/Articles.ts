import type { CollectionConfig } from 'payload';
import { formatSlugHook } from '../lib/formatSlug';

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Artículo / Noticia',
    plural: 'Artículos / Noticias',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true, // Lectura pública para el frontend
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titular de la Noticia',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL amigable)',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Se genera automáticamente a partir del titular.',
      },
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Resumen / Bajada de la Noticia (Extracto para portadas y SEO)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Categoría',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Principal / Portada',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de foto / Créditos de la imagen',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Cuerpo de la Noticia (Texto Completo)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sourceOrAuthor',
          type: 'text',
          label: 'Fuente o Autor Visible (Ej: Redacción Lakatuar, El Nacional)',
          defaultValue: 'Redacción Lakatuar',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          label: 'Periodista / Usuario del CMS',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado de Publicación',
      defaultValue: 'published',
      options: [
        { label: 'Publicado', value: 'published' },
        { label: 'Borrador', value: 'draft' },
        { label: 'Archivado', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de Publicación',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'placement',
      type: 'group',
      label: 'Ubicación y Destacados en Portada',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'isHero',
          type: 'checkbox',
          label: '⭐ Noticia Central Destacada (Hero)',
          defaultValue: false,
        },
        {
          name: 'isTopStory',
          type: 'checkbox',
          label: '📌 Noticia Principal en Top Stories',
          defaultValue: false,
        },
        {
          name: 'isSidebarStory',
          type: 'checkbox',
          label: '📑 Noticia Secundaria (Barra lateral Top Stories)',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Etiquetas / Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
