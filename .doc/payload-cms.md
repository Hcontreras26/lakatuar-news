# Documentación: Arquitectura de Payload CMS & Checklist de Refactorización

Esta guía detalla el funcionamiento, arquitectura, flujo de datos y el **checklist de refactorización** de **Payload CMS (v3.x)** en el proyecto **Lakatuar News** (Next.js 16 App Router con TypeScript y PostgreSQL en Supabase).

---

## 1. Resumen y Propósito

Payload CMS está integrado **de forma nativa** dentro del mismo proyecto de Next.js (App Router), compartiendo el mismo proceso de Node.js, tipos de TypeScript y conexión a la base de datos PostgreSQL.

### Objetivos principales del CMS:
- **Gestión Editorial Completa**: Redacción, edición y publicación de noticias con editor de texto enriquecido (**Lexical RichText**) y control de estados (*Borrador / Publicado / Archivado*).
- **Control Centralizado del Sitio (Globales)**: Controlar el estado de la transmisión en vivo de YouTube (`isLive`), horarios del programa, nombre de la presentadora, redes sociales y avisos de última hora.
- **Recepción Segura de Denuncias Ciudadanas**: Almacenamiento seguro de reportes y denuncias enviadas por los lectores con protección de identidad (fuentes anónimas).
- **Gestión de Medios**: Subida y optimización automática de imágenes (`thumbnail`, `card`, `hero`) con metadatos de accesibilidad (`alt text`) y créditos.

---

## 2. Arquitectura de Archivos del CMS

```
lakatuar-news/
├── src/
│   ├── collections/                # Esquemas y tablas del CMS
│   │   ├── Articles.ts             # Artículos y noticias completas con RichText
│   │   ├── Categories.ts           # Categorías temáticas con slugs y colores
│   │   ├── Denuncias.ts            # Buzón confidencial de denuncias ciudadanas
│   │   ├── Media.ts                # Archivos e imágenes con sharp
│   │   └── Users.ts                # Autenticación y administradores
│   ├── globals/
│   │   └── SiteSettings.ts         # Singleton para En Vivo, presentadora, avisos y redes
│   ├── lib/
│   │   ├── formatSlug.ts           # Helper para URLs amigables (sin acentos ni caracteres raros)
│   │   └── payload.ts              # Capa de servicio con Local API (Server Components)
│   ├── app/
│   │   ├── (payload)/              # Rutas del Panel Administrativo (/admin) y API de Payload
│   │   ├── api/
│   │   │   └── denuncias/
│   │   │       └── route.ts        # Endpoint para recibir denuncias del frontend
│   │   └── (frontend)/
│   │       ├── page.tsx            # Portada principal conectada al CMS
│   │       ├── lo-ultimo/page.tsx  # Página de últimas noticias conectada al CMS
│   │       ├── contacto/page.tsx   # Formulario y datos de contacto
│   │       └── noticias/[slug]/    # Lector dinámico de artículos con RichText
│   ├── payload.config.ts           # Configuración maestra de Payload CMS
│   └── payload-types.ts            # Tipos de TypeScript autogenerados por Payload
├── .env.local                      # Credenciales de Supabase (DATABASE_URI) y PAYLOAD_SECRET
└── .doc/
    ├── payload-cms.md              # Esta documentación
    ├── x-api.md                    # Documentación de la API de X
    └── youtube-rss.md              # Documentación de YouTube RSS
```

---

## 3. Modelos de Datos Implementados

### A. `Articles` (`src/collections/Articles.ts`)
| Campo | Tipo | Propósito |
| :--- | :--- | :--- |
| `title` | Text (Required) | Titular principal de la noticia. |
| `slug` | Text (Unique, Index) | Slug generado automáticamente desde el titular. |
| `summary` | Textarea (Required) | Resumen / Bajada periodística para portadas y SEO. |
| `category` | Relationship (`categories`) | Categoría a la que pertenece el artículo. |
| `coverImage` | Upload (`media`) | Fotografía principal con optimización automática. |
| `caption` | Text | Pie de foto y créditos de la imagen. |
| `content` | RichText (Lexical) | Cuerpo completo del artículo formateado. |
| `sourceOrAuthor` | Text | Autor o agencia visible (ej: *Redacción Lakatuar*). |
| `author` | Relationship (`users`) | Periodista registrado en el CMS. |
| `status` | Select | Estado (`published`, `draft`, `archived`). |
| `publishedAt` | Date | Fecha y hora de publicación. |
| `placement.isHero` | Checkbox | ⭐ Destacar en el Hero principal. |
| `placement.isTopStory` | Checkbox | 📌 Noticia principal de la sección *Top Stories*. |
| `placement.isSidebarStory` | Checkbox | 📑 Noticia secundaria de la columna lateral. |
| `tags` | Array | Etiquetas temáticas (ej: `#Elecciones`, `#Economía`). |

### B. `Categories` (`src/collections/Categories.ts`)
- `name`: Nombre visible (*Política, Venezuela, Economía, Sucesos, Deportes, Internacional*).
- `slug`: Identificador URL generado automáticamente.
- `color`: Color del *badge* visual (`blue`, `red`, `green`, `orange`, `purple`, `gray`).
- `description`: Descripción para metadatos y SEO.

### C. `Media` (`src/collections/Media.ts`)
- `upload`: Almacena en `public/media` y genera 3 tamaños: `thumbnail` (300x200), `card` (600x400) y `hero` (1200x675).
- `alt`: Texto alternativo obligatorio para accesibilidad y Google Images.
- `caption`: Leyenda del archivo.

### D. `Denuncias` (`src/collections/Denuncias.ts`)
- **Acceso seguro**: Creación pública desde el frontend; lectura y edición restringida **exclusivamente a usuarios autenticados**.
- `subject`: Asunto de la denuncia.
- `fullName` e `isAnonymous`: Soporte para fuentes anónimas con protección de identidad.
- `email` y `phone`: Vías de contacto confidenciales.
- `category`: Tipo de denuncia (*Servicios Públicos, DDHH, Corrupción, Salud, Seguridad, Otro*).
- `description`: Relato detallado.
- `attachments`: Subida de evidencias (fotos, videos, documentos).
- `status`: Estado editorial (*Nueva, En Revisión, En Investigación, Publicada, Descartada*).
- `internalNotes`: Notas del equipo periodístico.

### E. Global `SiteSettings` (`src/globals/SiteSettings.ts`)
- **📺 En Vivo**: `isLive` (activa indicadores en vivo), `liveTitle`, `liveSchedule`, `liveUrl`, `presenterName`, `presenterBio`.
- **📞 Contacto y Redes**: `contactEmail`, `whatsappNumber`, `xUrl`, `youtubeUrl`, `instagramUrl`, `tiktokUrl`.
- **⚖️ Banners y Avisos**: `announcementBanner` (cintillo de última hora), `denunciasBannerText`.

---

## 4. Capa de Servicio: Local API (`src/lib/payload.ts`)

En lugar de realizar peticiones HTTP lentas contra sí mismo, Next.js se comunica con Payload mediante la **Local API**:

```typescript
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// 1. Obtener configuraciones del sitio
export async function getSiteSettings(): Promise<SiteSetting | null>;

// 2. Obtener noticias para Top Stories (con fallback inteligente)
export async function getTopStoriesData(): Promise<{ mainStory: Article | null; sidebarStories: Article[] }>;

// 3. Obtener artículos paginados para Lo Último o por categoría
export async function getLatestArticles(options?: { page?: number; limit?: number; categorySlug?: string });

// 4. Obtener un artículo por su slug para la vista de detalle
export async function getArticleBySlug(slug: string): Promise<Article | null>;

// 5. Obtener todas las categorías
export async function getCategories(): Promise<Category[]>;
```

### 🛡️ Patrón de Resiliencia (Fallback Inteligente):
Si la base de datos aún no tiene noticias publicadas, las funciones devuelven datos estructurados de plantilla. Esto garantiza que la web **nunca se rompa ni se muestre en blanco** mientras el equipo editorial carga contenido inicial.

---

## 5. Estado Actual de la Integración (¿Qué es dinámico hoy?)

- [x] **Portada (`page.tsx`)**:
  - [x] Banner de **ÚLTIMA HORA** dinámico (si `announcementBanner` tiene texto en `SiteSettings`).
  - [x] Indicador **🔴 EN VIVO AHORA** en Header y Hero sincronizado con `SiteSettings.isLive`.
  - [x] Horarios del programa y nombre de la presentadora sincronizados con `SiteSettings`.
  - [x] Redes sociales de cabecera y pie de página controladas desde `SiteSettings`.
  - [x] Noticias de la sección **Top Stories** obtenidas de la colección `Articles`.
- [x] **Lo Último (`lo-ultimo/page.tsx`)**:
  - [x] Las 3 columnas de noticias leen automáticamente los artículos publicados en `Articles`.
  - [x] Enlaces directos a la página de lectura `/noticias/[slug]`.
- [x] **Lector de Artículos (`noticias/[slug]/page.tsx`)**:
  - [x] Renderizado de texto enriquecido Lexical (`<RichText data={article.content} />`).
  - [x] Generación dinámica de metadatos OpenGraph (título, bajada, foto de portada).
  - [x] Botones para compartir en X y WhatsApp con URLs dinámicas.
  - [x] Barra lateral con otras noticias recientes.
- [x] **Recepción de Denuncias (`ContactForm.tsx` & `/api/denuncias`)**:
  - [x] El formulario guarda denuncias reales en la tabla `denuncias` de Supabase.

---

## 6. Checklist de Refactorización (Front-End sin Hardcode)

A continuación se detalla el plan de acción para eliminar los últimos elementos estáticos del frontend y conectarlos al CMS:

### 📋 Checklist 1: Página de Contacto (`src/app/(frontend)/contacto/page.tsx`)
- [ ] **Paso 1.1**: Convertir la página en Server Component asíncrono y consultar `getSiteSettings()`.
- [ ] **Paso 1.2**: Reemplazar los correos estáticos (`prensa@lakatuar.com`, `denuncias@lakatuar.com`) por `siteSettings.contactEmail`.
- [ ] **Paso 1.3**: Reemplazar el número de WhatsApp hardcodeado por `siteSettings.whatsappNumber` (con enlace `https://wa.me/...`).
- [ ] **Paso 1.4**: Reemplazar el badge *"Lun - Vie \| 1:15 PM"* del encabezado por `siteSettings.liveSchedule`.
- [ ] **Paso 1.5**: Conectar los enlaces a perfiles de redes sociales de la tarjeta de contacto con los campos de `SiteSettings`.

### 📋 Checklist 2: Banner de Denuncias (`src/components/ui/DenunciasBanner.tsx`)
- [ ] **Paso 2.1**: Recibir `scheduleText` y `timeText` desde las props mapeadas de `siteSettings.liveSchedule`.
- [ ] **Paso 2.2**: Hacer que el código QR y el botón del banner apunten dinámicamente al enlace de WhatsApp (`siteSettings.whatsappNumber`) o a la ruta `/contacto`.

### 📋 Checklist 3: Cintillo de Titulares Rápidos en Lo Último (`src/app/(frontend)/lo-ultimo/page.tsx`)
- [ ] **Paso 3.1**: Reemplazar el array estático `BREAKING_ITEMS` por los titulares reales de las últimas noticias consultadas (`cmsArticles.map(a => a.title)`).

### 📋 Checklist 4: Imagen de la Presentadora en Hero (`src/components/sections/HeroSection.tsx`)
- [ ] **Paso 4.1**: Añadir un campo de tipo `upload` (relación a `Media`) en `SiteSettings` para la imagen de la presentadora.
- [ ] **Paso 4.2**: Si está configurada en el CMS, usar la URL de `Media`; si no, mantener `/presentadora.png` como fallback predeterminado.

### 📋 Checklist 5: Páginas Legales (`privacidad` y `terminos`)
- [ ] **Paso 5.1**: Opcionalmente crear un Global o Colección `Pages` / `LegalContent` en Payload para que el equipo legal pueda editar las políticas de privacidad y términos y condiciones desde el panel `/admin`.

---

## 7. Comandos de Mantenimiento

| Comando | Función |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor Next.js con soporte completo para Payload en `http://localhost:3000`. |
| `pnpm generate:types` | Regenera el archivo `src/payload-types.ts` cuando se agregan o modifican colecciones o globales. |
| `pnpm generate:importmap` | Actualiza el mapa de importaciones de componentes para el panel `/admin`. |
| `pnpm lint` | Valida tipado TypeScript y reglas de código ESLint. |
