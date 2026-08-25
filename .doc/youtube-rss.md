# Documentación: Integración de YouTube RSS Feed

Esta guía detalla la implementación, arquitectura y configuración del consumo de videos de YouTube en tiempo real a través del **RSS Feed público (Atom/XML)** en este proyecto desarrollado con Next.js (App Router).

---

## 1. ¿Qué es el RSS Feed público de YouTube?

YouTube expone automáticamente un feed público en formato Atom XML para cada canal o lista de reproducción sin necesidad de autenticación, API Keys de Google Cloud ni consumo de cuotas diarias.

### URL del Feed:
```http
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
```
*(Donde `CHANNEL_ID` es el identificador único del canal que comienza habitualmente con `UC...`).*

### Ventajas:
- **100% Gratuito y sin límites de cuota**: A diferencia de la *YouTube Data API v3* (que impone límites diarios estrictos de 10,000 unidades de cuota), el feed RSS no requiere registrar una cuenta de desarrollador ni gestionar claves secretas.
- **Tiempo real y bajo mantenimiento**: Las subidas y transmisiones finalizadas se reflejan casi instantáneamente en el feed.
- **Cache amigable con Next.js**: Se puede revalidar periódicamente mediante la caché de Next.js (`fetch(..., { next: { revalidate: 900 } })`).

---

## 2. Arquitectura de la Implementación en el Proyecto

La integración está dividida en capas desacopladas para garantizar resiliencia, rendimiento y mantenibilidad:

```
lakatuar-news/
├── lib/
│   └── youtube.ts                  # Servicio que descarga y procesa el XML del Feed
├── components/
│   ├── ui/
│   │   └── VideoCard.tsx           # Componente visual para cada video con soporte de enlace
│   └── sections/
│       └── OnDemandSection.tsx     # Sección contenedora (VOD) con soporte de fallback
├── app/
│   └── page.tsx                    # Server Component asíncrono que obtiene los videos
├── next.config.ts                  # Configuración de dominios permitidos para imágenes (next/image)
├── .env.example                    # Plantilla de variables de entorno
└── .env.local                      # Archivo local con la configuración activa (ignorado en git)
```

---

### A. Servicio: `lib/youtube.ts`

El módulo [`lib/youtube.ts`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/lib/youtube.ts) exporta la función principal `getLatestYouTubeVideosFromRSS(channelId?, limit?)`:

1. **Detección del Channel ID**: Lee el canal desde el argumento o desde la variable de entorno `YOUTUBE_CHANNEL_ID`.
2. **Petición HTTP con ISR (Incremental Static Regeneration)**:
   ```typescript
   const res = await fetch(feedUrl, {
     next: { revalidate: 900 }, // Revalida cada 15 minutos (900 seg)
   });
   ```
3. **Parseo y Extracción de Datos**:
   - `videoId`: Extraído desde la etiqueta `<yt:videoId>`.
   - `title`: Extraído desde `<title>` y procesado con `decodeXmlEntities()` para corregir entidades como `&amp;`, `&quot;`, `&#39;`, etc.
   - `published`: Extraído desde `<published>` y formateado con `formatRelativeDate()` (ejemplo: *"HACE 2 DÍAS"*, *"HACE 5 H"*, etc.).
   - `thumb`: Extraído de `<media:thumbnail url="...">` y normalizado al dominio estándar `https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`.
   - `url`: Genera el enlace directo al video `https://www.youtube.com/watch?v={videoId}`.

---

### B. Componente Visual: `components/ui/VideoCard.tsx`

El componente [`components/ui/VideoCard.tsx`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/components/ui/VideoCard.tsx):
- Recibe un objeto que cumple con la interfaz `VideoItem`.
- Utiliza `next/image` optimizado con `fill` y relación de aspecto `aspect-video`.
- Envuelve el contenido en un enlace semántico `<a>` (`target="_blank"`, `rel="noopener noreferrer"`) si `item.url` está presente.
- Muestra los badges de estado/fecha y la etiqueta de programa (*EN LA MIRA*).
- Implementa `line-clamp-2` para que los títulos de YouTube mantengan una altura homogénea.

---

### C. Sección de Videos: `components/sections/OnDemandSection.tsx`

El componente [`components/sections/OnDemandSection.tsx`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/components/sections/OnDemandSection.tsx):
- Renderiza la cuadrícula de videos.
- Implementa un **fallback automático**: si no hay videos en el canal, no se ha configurado la variable de entorno o la red externa falla, muestra los elementos por defecto predefinidos (`defaultVodItems`) para evitar dejar la interfaz vacía.

---

### D. Carga en Servidor: `app/page.tsx`

El archivo [`app/page.tsx`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/app/page.tsx) es un **Server Component asíncrono**:
```tsx
export default async function Home(): Promise<React.JSX.Element> {
  const latestVideos = await getLatestYouTubeVideosFromRSS();

  return (
    <main className="min-h-screen bg-[#120404] text-white">
      {/* ... */}
      <OnDemandSection items={latestVideos} />
      {/* ... */}
    </main>
  );
}
```

---

### E. Configuración de Miniaturas: `next.config.ts`

YouTube distribuye imágenes a través de diferentes subdominios (`i.ytimg.com`, `i1.ytimg.com`, `i2.ytimg.com`, etc.). En [`next.config.ts`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/next.config.ts) se configuraron los patrones necesarios en `remotePatterns`:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "**.ytimg.com" },
    { protocol: "https", hostname: "i.ytimg.com" },
    { protocol: "https", hostname: "i1.ytimg.com" },
    { protocol: "https", hostname: "i2.ytimg.com" },
    { protocol: "https", hostname: "i3.ytimg.com" },
    { protocol: "https", hostname: "i4.ytimg.com" },
    { protocol: "https", hostname: "img.youtube.com" },
    { protocol: "https", hostname: "**.youtube.com" },
  ],
}
```

---

## 3. Guía de Configuración Paso a Paso

### Paso 1: Obtener el Channel ID (`UC...`) de YouTube
1. Abre tu canal en el navegador (ejemplo: `https://www.youtube.com/@lakatuar`).
2. Haz clic derecho en cualquier parte de la página y selecciona **Ver código fuente de la página** (`Ctrl + U` o `Cmd + Option + U`).
3. Presiona `Ctrl + F` y busca `itemprop="channelId"` o `channel_id=`.
4. Copia el identificador (comienza con `UC`, ejemplo: `UC_x5XG1OV2P6uZZ5FSM9Ttw`).

### Paso 2: Crear el archivo `.env.local`
En la raíz del proyecto, crea un archivo `.env.local` con tu ID de canal:

```env
YOUTUBE_CHANNEL_ID=UC_x5XG1OV2P6uZZ5FSM9Ttw
```

### Paso 3: Configurar en Entornos de Producción (Vercel, Netlify, etc.)
En el panel de control de tu plataforma de hosting (por ejemplo, Vercel Dashboard):
1. Ve a **Settings** > **Environment Variables**.
2. Agrega la variable:
   - **Key**: `YOUTUBE_CHANNEL_ID`
   - **Value**: `UC_x5XG1OV2P6uZZ5FSM9Ttw`
3. Guarda y realiza un nuevo despliegue.

---

## 4. Estructura del Feed XML de Referencia

A modo de referencia técnica, la respuesta del feed XML contiene la siguiente estructura básica:

```xml
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
      xmlns:media="http://search.yahoo.com/mrss/"
      xmlns="http://www.w3.org/2005/Atom">
  <link rel="self" href="https://www.youtube.com/feeds/videos.xml?channel_id=UC..."/>
  <title>Nombre del Canal</title>
  
  <entry>
    <id>yt:video:VIDEO_ID</id>
    <yt:videoId>VIDEO_ID</yt:videoId>
    <title>Título del Video</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=VIDEO_ID"/>
    <published>2026-08-24T18:00:00+00:00</published>
    <media:group>
      <media:title>Título del Video</media:title>
      <media:thumbnail url="https://i1.ytimg.com/vi/VIDEO_ID/hqdefault.jpg" width="480" height="360"/>
    </media:group>
  </entry>
</feed>
```

---

## 5. Preguntas Frecuentes y Solución de Problemas

### ¿Por qué aparece un error de `hostname not configured`?
Next.js requiere que cualquier dominio externo utilizado en `next/image` esté registrado en `next.config.ts`. Si modificas `next.config.ts`, debes reiniciar el servidor local de desarrollo (`npm run dev`).

### ¿Con qué frecuencia se actualizan los videos?
Por defecto, la función `getLatestYouTubeVideosFromRSS` utiliza `revalidate: 900` (15 minutos). Puedes ajustar este valor en [`lib/youtube.ts`](file:///c:/Users/Edux/Documents/lakatuar/lakatuar-news/lib/youtube.ts) según la frecuencia de publicación de tu canal.

### ¿Qué ocurre si no hay conexión o YouTube no responde?
El servicio captura el error internamente y retorna un arreglo vacío `[]`. `OnDemandSection` detecta esto y muestra automáticamente el contenido de reserva (`defaultVodItems`), asegurando que la interfaz nunca se rompa.
