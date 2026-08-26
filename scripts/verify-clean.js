'use strict';

/**
 * OLA 3 - PUNTO 1(d). Mitad 1 de 2 de `npm run verify:clean` (ver
 * package.json — este script se encadena con
 * scripts/verify-clean-server-check.js via `&&`, deliberadamente como dos
 * procesos TOP-LEVEL separados; ver la nota junto al arranque del servidor,
 * mas abajo, sobre por que).
 *
 * Reproduce la secuencia que Ola 2 declaro "verificada" sin en realidad
 * haberla corrido nunca contra un `npm ci` real (ver
 * docs/REAUDITORIA_OLA2.md, Hallazgo P1-R1): checkout limpio -> npm ci ->
 * migration:run -> db:seed:demo -> build. La mitad 2 (arranque -> login
 * real -> apagado -> limpieza de la BD) esta en verify-clean-server-check.js.
 *
 * Regla de esta ola (documentada en CLAUDE.md): `npm run verify:clean` es
 * el ULTIMO paso de cada ola de remediacion, nunca uno intermedio. Si algo
 * despues de correrlo modifica package-lock.json (un `npm audit fix`, un
 * bump de dependencia), hay que volver a correrlo antes de declarar la ola
 * cerrada.
 *
 * Cualquier paso que falle detiene el script inmediatamente con exit code
 * distinto de cero.
 */

const { spawnSync } = require('child_process');
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
  // stdio:'pipe' SIEMPRE aqui, nunca 'inherit' — causa raiz encontrada y
  // aislada de forma reproducible durante el cierre de Ola 3: en este
  // entorno Windows, una sola llamada previa a spawnSync con
  // `stdio:'inherit'` (sin importar `shell:true`/`false`) deja al proceso
  // en un estado donde un `spawn`/`spawnSync` POSTERIOR, si ese hijo a su
  // vez genera un nieto con E/S real (el servidor HTTP de
  // verify-clean-server-check.js), nunca abre su puerto ni escribe una
  // sola linea a stdout/stderr — reproducido de forma minima con un solo
  // spawnSync inocuo intercalado. Cambiar TODAS las llamadas de este script
  // a `stdio:'pipe'` (capturado y reimpreso abajo, para no perder
  // visibilidad) evita la corrupcion por completo.
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: 'pipe',
    shell: process.platform === 'win32',
    ...opts,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
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

  // El paso de arranque + login real + apagado vive en un proceso TOP-LEVEL
  // aparte (scripts/verify-clean-server-check.js), encadenado a nivel de
  // `package.json` con `&&`, NO invocado desde aqui con spawn/spawnSync.
  // Causa raiz encontrada durante el cierre de Ola 3, reproducida de forma
  // minima y consistente: en este entorno Windows, despues de que ESTE
  // proceso ya ejecuto varios `spawnSync` (npm ci en particular, con toda
  // su propia actividad de red/subprocesos), CUALQUIER spawn/spawnSync
  // posterior en el MISMO proceso que a su vez genere un nieto con E/S real
  // (el servidor HTTP) deja a ese nieto vivo pero sin abrir jamas su puerto
  // ni escribir una sola linea a stdout/stderr — probado con `stdio:'pipe'`
  // en todas las variantes, con y sin `shell`, sin exito. La unica
  // mitigacion que funciono de forma consistente fue evitar el anidamiento
  // de tres niveles por completo: `verify-clean-server-check.js` arranca
  // como hijo directo del SHELL (via `&&` en el script de npm), no como
  // hijo de este proceso Node ya "usado". Ver package.json.
  console.log(
    `\n[verify:clean] setup completo. Base de datos de verificacion: ${VERIFY_DB} (puerto ${VERIFY_PORT}). ` +
      'Continua scripts/verify-clean-server-check.js.',
  );
}

main().catch(async (e) => {
  console.error(`\n[verify:clean] ${e.message}`);
  await dropDatabase();
  process.exitCode = process.exitCode || 1;
});
