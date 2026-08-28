import type { FieldHook } from 'payload';

export const formatSlug = (val: string): string => {
  return val
    .normalize('NFD') // Descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remueve tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Remueve caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-'); // Evita guiones consecutivos
};

export const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string' && value.trim()) {
      return formatSlug(value);
    }

    if (operation === 'create' || operation === 'update') {
      const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField];
      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData);
      }
    }

    return value;
  };
