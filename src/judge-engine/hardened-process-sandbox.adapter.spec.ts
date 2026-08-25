import { HardenedProcessSandboxAdapter } from './hardened-process-sandbox.adapter';

// Timeout largo: cada caso lanza un proceso hijo real de Node.
jest.setTimeout(20000);

describe('HardenedProcessSandboxAdapter', () => {
  let adapter: HardenedProcessSandboxAdapter;

  beforeEach(() => {
    adapter = new HardenedProcessSandboxAdapter();
  });

  it('ejecuta código legítimo y lo califica correctamente', async () => {
    const result = await adapter.executeIsolated(
      "console.log('Hola Mundo')",
      'javascript',
      { expected: 'Hola Mundo' },
    );

    expect(result.status).toBe('accepted');
    expect(result.stdout).toBe('Hola Mundo');
    expect(result.stderr).toBe('');
  });

  it('califica wrong_answer cuando la salida no coincide con lo esperado', async () => {
    const result = await adapter.executeIsolated(
      "console.log('otra cosa')",
      'javascript',
      { expected: 'Hola Mundo' },
    );

    expect(result.status).toBe('wrong_answer');
  });

  it('rechaza lenguajes distintos de JavaScript con error explícito', async () => {
    const result = await adapter.executeIsolated('print("Hola")', 'python', {
      expected: '',
    });

    expect(result.status).toBe('runtime_error');
    expect(result.stderr).toContain('solo JavaScript');
  });

  // Regresión directa de P0-05: este adaptador NUNCA debe aprobar código por
  // contener una palabra mágica — solo por producir la salida correcta.
  it('NO aprueba código solo por contener la palabra "correct" (a diferencia del mock anterior)', async () => {
    const result = await adapter.executeIsolated(
      '// esto es correct pero no imprime nada',
      'javascript',
      { expected: 'Hola Mundo' },
    );

    expect(result.status).not.toBe('accepted');
  });

  // Regresión directa de P0-01: los payloads literales del informe de
  // auditoría deben quedar bloqueados por el modelo de permisos de Node.
  describe('vectores de ataque del informe de auditoría', () => {
    it('bloquea el robo de secretos vía this.constructor.constructor(\'return process\')()', async () => {
      const result = await adapter.executeIsolated(
        `const p = this.constructor.constructor('return process')();
         console.log(JSON.stringify(p.env));`,
        'javascript',
        { expected: '' },
      );

      expect(result.status).toBe('runtime_error');
      expect(result.stdout).not.toMatch(/JWT_SECRET|DB_PASSWORD|OPENAI_API_KEY/);
    });

    it('bloquea RCE vía child_process.execSync', async () => {
      const result = await adapter.executeIsolated(
        `console.log(require('child_process').execSync('whoami').toString());`,
        'javascript',
        { expected: '' },
      );

      expect(result.status).toBe('runtime_error');
      expect(result.stdout).toBe('');
    });

    it('bloquea la escritura en disco fuera del directorio del sandbox', async () => {
      const result = await adapter.executeIsolated(
        `require('fs').writeFileSync('pwned.txt', 'x'); console.log('WROTE');`,
        'javascript',
        { expected: '' },
      );

      expect(result.status).toBe('runtime_error');
      expect(result.stdout).not.toContain('WROTE');
    });

    it('bloquea conexiones de red salientes (SSRF/exfiltración)', async () => {
      const result = await adapter.executeIsolated(
        `require('net').connect(3306, '127.0.0.1', () => console.log('CONECTADO'));
         setTimeout(() => console.log('fin'), 100);`,
        'javascript',
        { expected: '' },
      );

      expect(result.stdout).not.toContain('CONECTADO');
    });

    it('corta un bucle infinito por timeout sin colgar el proceso host', async () => {
      const result = await adapter.executeIsolated('while(true){}', 'javascript', {
        expected: '',
      });

      expect(result.status).toBe('time_limit');
    });
  });

  // Test del canario (addendum a ADR 06): la propiedad que de verdad importa
  // no es "el entorno es un objeto vacío" (en Windows nunca lo es, ver
  // buildSandboxEnv) sino que NINGÚN secreto real del proceso padre llega
  // al hijo, sea cual sea el sistema operativo o la versión de libuv.
  it('el proceso hijo NO puede ver ningún secreto del proceso padre (test del canario)', async () => {
    process.env.STIRE_CANARY_SECRET = 'canario-no-debe-filtrarse';
    process.env.JWT_SECRET = 'topsecret123';
    process.env.DB_PASSWORD = 'mysqlpass';
    process.env.OPENAI_API_KEY = 'sk-canary';

    const result = await adapter.executeIsolated(
      'console.log(JSON.stringify(process.env));',
      'javascript',
      { expected: '' },
    );

    expect(result.stdout).not.toContain('canario-no-debe-filtrarse');
    expect(result.stdout).not.toMatch(/JWT_SECRET|DB_PASSWORD|OPENAI_API_KEY/);

    delete process.env.STIRE_CANARY_SECRET;
    delete process.env.JWT_SECRET;
    delete process.env.DB_PASSWORD;
    delete process.env.OPENAI_API_KEY;
  });
});
