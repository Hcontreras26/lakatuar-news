import type { CollectionConfig } from 'payload';

export const Denuncias: CollectionConfig = {
  slug: 'denuncias',
  labels: {
    singular: 'Denuncia Ciudadana',
    plural: 'Buzón de Denuncias',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'fullName', 'category', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Permite que cualquier usuario cree una denuncia desde el formulario del frontend
    read: ({ req }) => Boolean(req.user), // Solo usuarios autenticados del panel administrativo pueden leer las denuncias
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Asunto o Motivo de la Denuncia',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Nombre Completo del Denunciante',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'isAnonymous',
          type: 'checkbox',
          label: 'Solicita Anonimato (Proteger Identidad)',
          defaultValue: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Correo Electrónico de Contacto',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono / WhatsApp',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          label: 'Ubicación / Ciudad / Estado',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'category',
          type: 'select',
          label: 'Tipo de Denuncia',
          defaultValue: 'servicios_publicos',
          options: [
            { label: 'Servicios Públicos (Agua, Luz, Gas)', value: 'servicios_publicos' },
            { label: 'Derechos Humanos y Persecución', value: 'ddhh' },
            { label: 'Corrupción e Irregularidades', value: 'corrupcion' },
            { label: 'Salud y Hospitales', value: 'salud' },
            { label: 'Seguridad Ciudadana y Sucesos', value: 'seguridad' },
            { label: 'Comunidad / Otro', value: 'otro' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Relato y Detalles de la Denuncia',
    },
    {
      name: 'attachments',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Fotos, Videos o Documentos Adjuntos (Evidencias)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado de la Denuncia',
      defaultValue: 'new',
      options: [
        { label: '🟡 Nueva (Sin revisar)', value: 'new' },
        { label: '🔵 En Revisión Editorial', value: 'in_review' },
        { label: '🟣 En Investigación Periodística', value: 'investigating' },
        { label: '🟢 Noticia Publicada', value: 'published' },
        { label: '⚪ Descartada / Archivada', value: 'dismissed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Notas Internas del Equipo Periodístico',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
