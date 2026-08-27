import fs from 'node:fs';
import path from 'node:path';

// Helper to manually load .env.local if not loaded via --env-file
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

const rawToken =
  process.env.X_API_BEARER_TOKEN ||
  process.env.X_BEARER_TOKEN ||
  process.env.TWITTER_BEARER_TOKEN;

const username =
  process.env.X_USERNAME || process.env.TWITTER_USERNAME || 'la_katuar';
const baseUrl = (process.env.X_API_BASE_URL || 'https://api.x.com/2').replace(
  /\/+$/,
  ''
);

console.log('='.repeat(60));
console.log('🧪 TEST DE RESPUESTA DE LA API DE X (TWITTER v2)');
console.log('='.repeat(60));
console.log(`👤 Usuario objetivo: @${username}`);
console.log(`🌐 Base URL:         ${baseUrl}`);
console.log(
  `🔑 Bearer Token:     ${
    rawToken
      ? `${rawToken.substring(0, 10)}...${rawToken.slice(-6)} (Longitud: ${
          rawToken.length
        })`
      : '❌ NO CONFIGURADO en .env.local'
  }`
);
console.log('-'.repeat(60));

if (!rawToken) {
  console.error('\n❌ ERROR: No se encontró ningún Bearer Token configurado.');
  console.error('Por favor define X_API_BEARER_TOKEN en tu archivo .env.local\n');
  process.exit(1);
}

const bearerToken = rawToken.includes('%')
  ? decodeURIComponent(rawToken)
  : rawToken;

async function runTest() {
  try {
    // 1. Test Usuario
    console.log(`\n📡 [Paso 1/2] Consultando perfil para @${username}...`);
    const userUrl = `${baseUrl}/users/by/username/${username}?user.fields=profile_image_url,verified,description,public_metrics`;
    console.log(`   URL: ${userUrl}`);

    const userRes = await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    console.log(`   Estado HTTP: ${userRes.status} ${userRes.statusText}`);
    const userText = await userRes.text();
    let userData = null;

    try {
      userData = JSON.parse(userText);
    } catch {
      console.log('   Respuesta (Texto sin formato):', userText);
    }

    if (!userRes.ok) {
      console.error('\n❌ Error al consultar usuario en la API de X:');
      console.error(JSON.stringify(userData || userText, null, 2));
      diagnoseError(userRes.status, userData);
      return;
    }

    console.log('✅ Perfil obtenido exitosamente:');
    console.log(JSON.stringify(userData, null, 2));

    const userId = userData?.data?.id;
    if (!userId) {
      console.error('⚠️ No se encontró el ID del usuario en la respuesta.');
      return;
    }

    // 2. Test Tweets
    console.log(`\n📡 [Paso 2/2] Consultando tweets del usuario (ID: ${userId})...`);
    const tweetsUrl = `${baseUrl}/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=url,preview_image_url,type`;
    console.log(`   URL: ${tweetsUrl}`);

    const tweetsRes = await fetch(tweetsUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    console.log(`   Estado HTTP: ${tweetsRes.status} ${tweetsRes.statusText}`);
    const tweetsText = await tweetsRes.text();
    let tweetsData = null;

    try {
      tweetsData = JSON.parse(tweetsText);
    } catch {
      console.log('   Respuesta (Texto sin formato):', tweetsText);
    }

    if (!tweetsRes.ok) {
      console.error('\n❌ Error al consultar tweets en la API de X:');
      console.error(JSON.stringify(tweetsData || tweetsText, null, 2));
      diagnoseError(tweetsRes.status, tweetsData);
      return;
    }

    const tweetCount = tweetsData?.data?.length || 0;
    console.log(`✅ Tweets obtenidos exitosamente (${tweetCount} tweets):`);
    console.log(JSON.stringify(tweetsData, null, 2));

    console.log('\n' + '='.repeat(60));
    console.log('🎉 ¡TEST COMPLETADO CON ÉXITO! La API de X responde correctamente.');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n💥 Error inesperado durante la ejecución:', error);
  }
}

function diagnoseError(status, data) {
  console.log('\n🔍 DIAGNÓSTICO:');
  if (status === 401) {
    console.log(
      '-> Error 401 Unauthorized: El Bearer Token es inválido, expiró o está mal copiado.'
    );
  } else if (status === 402) {
    console.log(
      '-> Error 402 Payment Required: La cuenta de X Developer requiere plan de pago (Pay-As-You-Go / Pro) o se agotaron los créditos.'
    );
  } else if (status === 403) {
    console.log(
      '-> Error 403 Forbidden: La App de X no tiene permisos asignados para acceder a este endpoint (Free Tier en X v2 restringe ciertos endpoints).'
    );
  } else if (status === 429) {
    console.log(
      '-> Error 429 Too Many Requests: Se ha alcanzado el límite de peticiones (Rate Limit). Espera 15 minutos.'
    );
  }
  if (data?.title || data?.detail) {
    console.log(`   Detalle de X: [${data.title}] ${data.detail}`);
  }
}

runTest();
