import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.substring(0, eqIdx).trim();
          let val = trimmed.substring(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  }
}

loadEnv();

const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim();
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const apiVersion = (process.env.META_GRAPH_API_VERSION || 'v26.0').trim().replace(/^v?/, 'v');
const baseUrl = 'https://graph.facebook.com';

console.log('='.repeat(60));
console.log(`📸 TEST DE RESPUESTA: INSTAGRAM GRAPH API (Meta ${apiVersion})`);
console.log('='.repeat(60));
console.log(`🆔 Business Account ID: ${accountId || '❌ NO CONFIGURADO'}`);
console.log(`🌐 Versión de API:      ${apiVersion}`);
console.log(
  `🔑 Access Token:        ${
    accessToken
      ? `${accessToken.substring(0, 15)}...${accessToken.slice(-6)} (Longitud: ${accessToken.length})`
      : '❌ NO CONFIGURADO'
  }`
);
console.log('-'.repeat(60));

if (!accountId || !accessToken) {
  console.error('\n❌ ERROR: Faltan variables de entorno requeridas.');
  console.error('Por favor define INSTAGRAM_BUSINESS_ACCOUNT_ID e INSTAGRAM_ACCESS_TOKEN en .env.local\n');
  process.exit(1);
}

async function runTest() {
  try {
    // 1. Test Cuenta de Instagram
    console.log(`\n📡 [Paso 1/2] Verificando cuenta de Instagram (${accountId})...`);
    const accountUrl = `${baseUrl}/${apiVersion}/${accountId}?fields=id,username,name,profile_picture_url&access_token=${accessToken}`;
    
    const accountRes = await fetch(accountUrl);
    console.log(`   Estado HTTP: ${accountRes.status} ${accountRes.statusText}`);
    const accountText = await accountRes.text();
    let accountData = null;

    try {
      accountData = JSON.parse(accountText);
    } catch {
      console.log('   Respuesta (Texto sin formato):', accountText);
    }

    if (!accountRes.ok) {
      console.error('\n❌ Error al consultar la cuenta de Instagram:');
      console.error(JSON.stringify(accountData || accountText, null, 2));
      diagnoseError(accountRes.status, accountData);
      return;
    }

    console.log('✅ Cuenta verificada exitosamente:');
    console.log(JSON.stringify(accountData, null, 2));

    // 2. Test Media / Publicaciones
    console.log(`\n📡 [Paso 2/2] Consultando publicaciones recientes (/media)...`);
    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'timestamp',
      'like_count',
      'comments_count',
      'children{id,media_type,media_url,thumbnail_url,permalink,timestamp}',
    ].join(',');

    const mediaUrl = `${baseUrl}/${apiVersion}/${accountId}/media?fields=${fields}&limit=5&access_token=${accessToken}`;
    
    const mediaRes = await fetch(mediaUrl);
    console.log(`   Estado HTTP: ${mediaRes.status} ${mediaRes.statusText}`);
    const mediaText = await mediaRes.text();
    let mediaData = null;

    try {
      mediaData = JSON.parse(mediaText);
    } catch {
      console.log('   Respuesta (Texto sin formato):', mediaText);
    }

    if (!mediaRes.ok) {
      console.error('\n❌ Error al consultar publicaciones de Instagram:');
      console.error(JSON.stringify(mediaData || mediaText, null, 2));
      diagnoseError(mediaRes.status, mediaData);
      return;
    }

    const mediaCount = mediaData?.data?.length || 0;
    console.log(`✅ Publicaciones obtenidas exitosamente (${mediaCount} posts):`);
    console.log(JSON.stringify(mediaData, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('🎉 ¡TEST COMPLETADO CON ÉXITO! Meta Graph API responde correctamente.');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n💥 Error inesperado durante la ejecución:', error);
  }
}

function diagnoseError(status, data) {
  console.log('\n🔍 DIAGNÓSTICO:');
  const error = data?.error;
  if (status === 400 || error?.code === 190) {
    console.log(
      '-> Error de Token (190 / 400): El Access Token ha expirado, es inválido o no tiene permisos de instagram_basic / pages_show_list.'
    );
  } else if (error?.code === 100) {
    console.log(
      '-> Error de Parámetros (100): El Business Account ID o los campos solicitados no son válidos para esta versión de la API.'
    );
  } else if (status === 403 || error?.code === 200) {
    console.log(
      '-> Error de Permisos (200 / 403): La cuenta no tiene permisos para acceder al Instagram Business Account especificado.'
    );
  } else if (status === 429 || error?.code === 4 || error?.code === 17) {
    console.log(
      '-> Error de Rate Limit (429): Límite de llamadas alcanzado en la API de Meta Graph.'
    );
  }
  if (error?.message) {
    console.log(`   Mensaje de Meta: [Code ${error.code}${error.error_subcode ? `:${error.error_subcode}` : ''}] ${error.message}`);
  }
}

runTest();
