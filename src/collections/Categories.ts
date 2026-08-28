import type { CollectionConfig } from 'payload';
import { formatSlugHook } from '../lib/formatSlug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'color', 'updatedAt'],
  },
  access: {
    read: () => true, // Lectura pública para el frontend
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre de la Categoría (Ej: Política, Venezuela, Economía)',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL amigable)',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Se genera automáticamente a partir del nombre si se deja vacío.',
      },
      hooks: {
        beforeValidate: [formatSlugHook('name')],
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color de la Etiqueta (Badge)',
      defaultValue: 'blue',
      options: [
        { label: 'Azul (Política / General)', value: 'blue' },
        { label: 'Rojo (Urgente / Sucesos / Alerta)', value: 'red' },
        { label: 'Verde (Economía / Finanzas)', value: 'green' },
        { label: 'Naranja (Venezuela / Regiones)', value: 'orange' },
        { label: 'Púrpura (Internacional / Mundo)', value: 'purple' },
        { label: 'Gris (Opinión / Análisis)', value: 'gray' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción de la sección (Opcional - SEO)',
    },
  ],
};
