'use strict';

/**
 * OLA 3 - PUNTO 1(d).
 *
 * Reproduce, de punta a punta y en ESTE orden, la secuencia que Ola 2 declaro
 * "verificada" sin en realidad haberla corrido nunca contra un `npm ci` real
 * (ver docs/REAUDITORIA_OLA2.md, Hallazgo P1-R1): checkout limpio -> build ->
 * arranque -> login real -> apagado.
 *
 * Regla de esta ola (documentada en CLAUDE.md): este script es el ULTIMO
 * paso de cada ola de remediacion, nunca uno intermedio. Si algo despues de
 * correrlo modifica package-lock.json (un `npm audit fix`, un bump de
 * dependencia), hay que volver a correrlo antes de declarar la ola cerrada.
 *
 * Cualquier paso que falle detiene el script inmediatamente con exit code
 * distinto de cero. No hay pasos "opcionales" ni "best effort" salvo la
 * limpieza final (que se intenta siempre, incluso si algo antes fallo).
 */

const { spawnSync, spawn } = require('child_process');
const { existsSync, rmSync, readFileSync } = require('fs');
const path = require('path');

// Este script empieza borrando node_modules (paso 1). No puede depender de
// ningun paquete de ahi (ni `dotenv` ni `mysql2`) antes de que `npm ci` (paso
// 2) lo reponga - de lo contrario el propio script de verificacion falla por
// la razon equivocada. Por eso: parser de .env manual (sin dependencia) aqui
// arriba, y `require('mysql2/promise')` diferido a DESPUES de `npm ci`
// dentro de main().
function loadDotEnvFile() {
  const envPath = path.join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

const ROOT = path.resolve(__dirname, '..');
loadDotEnvFile();

const VERIFY_DB = process.env.VERIFY_DB_DATABASE || 'stire_verify_clean';
const VERIFY_PORT = process.env.VERIFY_PORT || '3097';
const DEMO_EMAIL = 'docente.demo@stire.local';
const DEMO_PASSWORD = 'Demo1234!';
const START_TIMEOUT_MS = 30000;

const dbEnv = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
};

let step = 0;
function log(msg) {
  step += 1;
  console.log(`\n[verify:clean ${step}] ${msg}`);
}

function fail(msg) {
  console.error(`\n[verify:clean] FALLO: ${msg}`);
  process.exitCode = 1;
  throw new Error(msg);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...opts,
  });
  if (result.status !== 0) {
    fail(`comando "${cmd} ${args.join(' ')}" salio con codigo ${result.status}`);
  }
}

async function createEmptyDatabase() {
  const mysql = require('mysql2/promise'); // diferido: recien disponible tras `npm ci`
  const conn = await mysql.createConnection({
    host: dbEnv.DB_HOST,
    port: Number(dbEnv.DB_PORT),
    user: dbEnv.DB_USERNAME,
    password: dbEnv.DB_PASSWORD,
  });
  await conn.query(`DROP DATABASE IF EXISTS \`${VERIFY_DB}\``);
  await conn.query(`CREATE DATABASE \`${VERIFY_DB}\``);
  await conn.end();
}

async function dropDatabase() {
  try {
    const mysql = require('mysql2/promise'); // puede no existir si npm ci nunca corrio
    const conn = await mysql.createConnection({
      host: dbEnv.DB_HOST,
      port: Number(dbEnv.DB_PORT),
      user: dbEnv.DB_USERNAME,
      password: dbEnv.DB_PASSWORD,
    });
    await conn.query(`DROP DATABASE IF EXISTS \`${VERIFY_DB}\``);
    await conn.end();
  } catch (e) {
    console.warn(`[verify:clean] no se pudo limpiar la base de datos de verificacion: ${e.message}`);
  }
}

function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  function attempt() {
    return fetch(url)
      .then((res) => res.status)
      .catch(() => null);
  }
  return new Promise((resolve, reject) => {
    (async function poll() {
      while (Date.now() < deadline) {
        const status = await attempt();
        if (status !== null) return resolve(true);
        await new Promise((r) => setTimeout(r, 500));
      }
      reject(new Error(`el servidor no respondio en ${url} dentro de ${timeoutMs}ms`));
    })();
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function rmDirWithRetry(full, attempts = 5) {
  for (let i = 1; i <= attempts; i += 1) {
    try {
      rmSync(full, { recursive: true, force: true });
      return;
    } catch (e) {
      // Windows bloquea transitoriamente archivos borrados (antivirus,
      // indexado, un watcher que aun no solto el handle) incluso sin ningun
      // otro proceso propio corriendo a la vez. Reintentar con backoff corto
      // es la mitigacion estandar - fallar directo en el primer EPERM haria
      // que este script, pensado para correr desatendido al final de cada
      // ola, sea flaky por una condicion del SO, no del codigo.
      if (i === attempts) throw e;
      await sleep(500 * i);
    }
  }
}

async function main() {
  log('rm -rf node_modules dist');
  for (const dir of ['node_modules', 'dist']) {
    const full = path.join(ROOT, dir);
    if (existsSync(full)) await rmDirWithRetry(full);
  }

  log('npm ci (instalacion exacta desde package-lock.json)');
  run('npm', ['ci']);

  log(`crear base de datos vacia de verificacion: ${VERIFY_DB}`);
  await createEmptyDatabase();

  const migrationEnv = { ...process.env, DB_DATABASE: VERIFY_DB };

  log('migration:run contra la base de datos vacia');
  run('npm', ['run', 'migration:run'], { env: migrationEnv });

  log('db:seed:demo contra la base de datos vacia');
  run('npm', ['run', 'db:seed:demo'], { env: migrationEnv });

  log('npm run build');
  run('npm', ['run', 'build']);

  log(`arranque del servidor en puerto ${VERIFY_PORT}`);
  const serverEnv = { ...process.env, DB_DATABASE: VERIFY_DB, PORT: VERIFY_PORT };
  const server = spawn('node', ['dist/main.js'], { cwd: ROOT, env: serverEnv, stdio: 'pipe' });

  let serverOutput = '';
  server.stdout.on('data', (d) => { serverOutput += d; });
  server.stderr.on('data', (d) => { serverOutput += d; });
  let serverExited = false;
  server.on('exit', () => { serverExited = true; });

  let readSucceeded = false;
  try {
    await waitForServer(`http://localhost:${VERIFY_PORT}/docs`, START_TIMEOUT_MS);
    if (serverExited) throw new Error('el proceso del servidor termino antes de responder');

    log('login real contra el servidor recien levantado (docente de demo)');
    const loginRes = await fetch(`http://localhost:${VERIFY_PORT}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: DEMO_EMAIL, password: DEMO_PASSWORD }),
    });
    if (loginRes.status !== 200 && loginRes.status !== 201) {
      const body = await loginRes.text();
      fail(`login devolvio status ${loginRes.status}: ${body}`);
    }
    const loginBody = await loginRes.json();
    if (!loginBody || !loginBody.access_token) {
      fail(`login respondio 200 pero sin access_token: ${JSON.stringify(loginBody)}`);
    }
    console.log(`  login OK para ${DEMO_EMAIL} (token recibido)`);

    log('verificacion de datos sembrados via GET /enrollment/my');
    const meRes = await fetch(`http://localhost:${VERIFY_PORT}/enrollment/my`, {
      headers: { Authorization: `Bearer ${loginBody.access_token}` },
    });
    if (meRes.status !== 200) {
      fail(`GET /enrollment/my devolvio status ${meRes.status} tras login exitoso`);
    }
    readSucceeded = true;
  } finally {
    log('apagado del servidor');
    server.kill('SIGTERM');
    await new Promise((r) => setTimeout(r, 1000));
    if (!server.killed) server.kill('SIGKILL');
    if (!readSucceeded) {
      console.error('\n--- salida del servidor (para diagnostico) ---');
      console.error(serverOutput.slice(-4000) || '(el proceso no escribio nada a stdout/stderr)');
    }
  }

  log(`limpieza: eliminar base de datos de verificacion ${VERIFY_DB}`);
  await dropDatabase();

  if (!process.exitCode) {
    console.log('\n[verify:clean] TODO EN VERDE: npm ci -> migration:run -> db:seed:demo -> build -> start -> login real -> apagado.');
  }
}

main()
  .catch((e) => {
    console.error(`\n[verify:clean] ${e.message}`);
    process.exitCode = process.exitCode || 1;
  })
  .finally(async () => {
    if (process.exitCode) {
      await dropDatabase();
    }
    process.exit(process.exitCode || 0);
  });
