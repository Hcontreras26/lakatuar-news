# Documentacion: Integracion de la API de X (Twitter v2)

Esta guia detalla la arquitectura, estructura de archivos, flujo de datos y funcionamiento del modulo de integracion de la **API de X (v2)** en el proyecto **Lakatuar News** (Next.js 16 App Router con TypeScript).

---

## 1. Resumen y Proposito

El modulo de X tiene como objetivo consultar y presentar en la pagina principal las publicaciones y coberturas mas recientes de la cuenta oficial de X (`@la_katuar`), incluyendo:
- Informacion del perfil (nombre, handle, avatar y estado de verificacion).
- Ultimos posts con texto enriquecido.
- Adjuntos multimedia (fotografias y miniaturas de video).
- Metricas publicas de interaccion (respuestas, reposts, me gusta e impresiones).

---

## 2. Arquitectura del Modulo

La integracion sigue una arquitectura desacoplada basada en principios **SOLID** y **Clean Code**:

```
lakatuar-news/
├── src/
│   ├── types/
│   │   └── twitter.ts                      # Interfaces TypeScript para entidades y respuestas
│   ├── lib/
│   │   └── twitter.ts                      # Servicio central con logica de consumo y fallback
│   ├── app/
│   │   ├── (frontend)/
│   │   │   └── page.tsx                    # Server Component que orquesta la carga concurrente
│   │   └── api/
│   │       └── twitter/
│   │           └── route.ts                # Route Handler HTTP para consumo cliente o externo
│   └── components/
│       ├── sections/
│       │   └── TwitterFeedSection.tsx      # Seccion contenedora con cabecera y grilla
│       └── ui/
│           └── TweetCard.tsx               # Componente visual para la tarjeta de cada tweet
├── .env.local                              # Variables de entorno locales
└── .doc/
    └── x-api.md                            # Documentacion tecnica
```

---

## 3. Modelo de Datos y Tipos TypeScript (`src/types/twitter.ts`)

Define los contratos de datos utilizados a lo largo de toda la aplicacion:

- `TweetMedia`: Representa un adjunto multimedia devuelto en la expansion `includes.media` (`photo`, `video`, `animated_gif`).
- `TweetPublicMetrics`: Contadores numericos de interaccion (`retweet_count`, `reply_count`, `like_count`, `impression_count`, `quote_count`, `bookmark_count`).
- `Tweet`: Estructura del post con su identificador, fecha de creacion ISO, contenido de texto, metricas y array de medios mapeados.
- `TwitterUser`: Perfil del autor (`id`, `name`, `username`, `profile_image_url`, `verified`).
- `TwitterApiResponse`: Respuesta compuesta que contiene el objeto `user` y el arreglo de `tweets`.

---

## 4. Capa de Servicio (`src/lib/twitter.ts`)

El modulo [`src/lib/twitter.ts`](file:///c:/Users/Administrador.A2SOFTWAY/Downloads/samsung-galaxy-s24-ultra-mockup/Alternativo/Lakatuar/lakatuar-news/src/lib/twitter.ts) encapsula la comunicacion con los servidores de X:

### A. Resolucion de Configuracion (`resolveConfig`)
- Extrae de forma centralizada las variables de entorno `X_API_BEARER_TOKEN` (con retrocompatibilidad para `TWITTER_BEARER_TOKEN`), `X_USERNAME`, `X_API_BASE_URL` y `X_FEED_REVALIDATE_SECONDS`.
- Normaliza tokens con codificacion URL (*URL-encoded*) mediante `decodeURIComponent`.
- Si no existe un token valido, retorna `null` para activar la degradacion controlada.

### B. Obtencion de Usuario (`fetchUserByUsername`)
- Realiza una peticion `GET /2/users/by/username/:username?user.fields=profile_image_url,verified`.
- Emplea autenticacion `Authorization: Bearer <TOKEN>`.
- Aplica cache de 24 horas (`revalidate: 86400`) dado que el ID y los datos basicos de perfil cambian con baja frecuencia.

### C. Obtencion de Publicaciones (`fetchUserTweets`)
- Realiza una peticion `GET /2/users/:id/tweets` con los parametros:
  - `max_results=5`
  - `tweet.fields=created_at,public_metrics,attachments`
  - `expansions=attachments.media_keys`
  - `media.fields=url,preview_image_url,type`
- Asocia automaticamente los identificadores de `attachments.media_keys` con los objetos multimedia de `includes.media`.
- Aplica revalidacion configurable (por defecto 15 minutos / 900 segundos).

### D. Orquestador y Resiliencia (`getTwitterFeed`)
- Ejecuta secuencialmente la resolucion de usuario y la busqueda de tweets.
- **Tolerancia a fallos:** Si las credenciales no estan configuradas, si la API responde con codigos de error (`401`, `402`, `403`, `429`) o si ocurre un fallo de red, la funcion devuelve de inmediato los datos de respaldo (`fallbackUser` y `fallbackTweets`) evitando caidas o errores 500 en el servidor.

---

## 5. Route Handler (`src/app/api/twitter/route.ts`)

Expone un endpoint REST interno en la ruta `GET /api/twitter`.
Aplica el principio **DRY (Don't Repeat Yourself)** delegando la ejecucion a `getTwitterFeed()`:

```typescript
import { NextResponse } from 'next/server';
import { getTwitterFeed } from '@/lib/twitter';
import type { TwitterApiResponse } from '@/types/twitter';

export async function GET(): Promise<NextResponse<TwitterApiResponse>> {
  const feed = await getTwitterFeed();
  return NextResponse.json<TwitterApiResponse>(feed);
}
```

---

## 6. Capa de Presentacion

### A. Server Component (`src/app/(frontend)/page.tsx`)
En la pagina principal de Next.js, la informacion se solicita en el servidor de forma concurrente con el feed de YouTube mediante `Promise.all`:

```typescript
const [latestVideos, twitterFeed] = await Promise.all([
  getLatestYouTubeVideosFromRSS(),
  getTwitterFeed(),
]);
```

### B. Seccion Visual (`src/components/sections/TwitterFeedSection.tsx`)
- Renderiza la barra de estado con la insignia de cuenta oficial, boton directo "Seguir en X" y la grilla simetrica responsiva de dos columnas.

### C. Componente de Tarjeta (`src/components/ui/TweetCard.tsx`)
- Renderiza el contenido del tweet con soporte para:
  - Avatar optimizado con `next/image`.
  - Icono de cuenta verificada.
  - Formato multilineal del texto del post.
  - Fotografia o miniatura de video con gradiente y boton interactivo.
  - Barra de metricas (respuestas, reposts, me gusta e impresiones).
  - Enlace externo directo hacia la publicacion original en `https://x.com`.

---

## 7. Variables de Entorno (`.env.local`)

El modulo requiere las siguientes variables de configuracion:

```env
# Token de aplicacion para la API v2 de X
X_API_BEARER_TOKEN=tu_bearer_token_aqui

# Nombre de usuario de la cuenta objetivo sin arroba
X_USERNAME=la_katuar

# URL base oficial de la API v2
X_API_BASE_URL=https://api.x.com/2

# Tiempo de revalidacion en segundos para la cache ISR de Next.js (900s = 15 min)
X_FEED_REVALIDATE_SECONDS=900
```

---

## 8. Diagnostico y Manejo de Errores Comunes

| Codigo HTTP | Significado | Causa en X API | Comportamiento en la App |
| :--- | :--- | :--- | :--- |
| **401 Unauthorized** | Autenticacion invalida | El Bearer Token no es valido, esta mal copiado o fue revocado. | Activa el fallback automatico. |
| **402 Payment Required** | Creditos agotados (`credits depleted`) | La cuenta en X Developer Portal esta en nivel Free y no tiene saldo para endpoints de lectura. | Registra advertencia en modo desarrollo y sirve datos de fallback. |
| **403 Forbidden** | Acceso denegado | La App no tiene permisos asignados para consultar el endpoint solicitado. | Activa el fallback automatico. |
| **429 Too Many Requests** | Limite de tasa excedido | Se supero la cuota de peticiones por ventana de 15 minutos. | La cache ISR (`revalidate: 900`) previene este error en produccion. |

---

## 9. Buenas Practicas Implementadas

1. **Cero Hardcoding:** No existen tokens, credenciales ni URLs quemadas en el codigo.
2. **Optimizacion de Cuota:** Uso de Incremental Static Regeneration (ISR) mediante la propiedad `next: { revalidate }` en las llamadas a `fetch`.
3. **Mapeo Tipado:** Validacion y transformacion de objetos adjuntos sin mutacion destructiva de datos.
4. **Resiliencia Total:** La aplicacion nunca se detiene ante indisponibilidad del servicio externo.
