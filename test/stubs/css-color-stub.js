/**
 * Stub de test para @asamuzakjp/css-color (Ola 2, Punto 6).
 *
 * jsdom lo requiere de forma incondicional al cargar CSSStyleDeclaration
 * para resolver colores CSS (getComputedStyle), pero solo se publica como
 * ESM puro — Jest (vía ts-jest) no logra transformarlo ni a él ni a su
 * cadena de dependencias (@csstools/css-tokenizer, etc.), y falla con
 * "Unexpected token 'export'" en cuanto algo hace `new JSDOM()`.
 *
 * DOMPurify + ContentRenderingService nunca resuelven colores CSS
 * computados — solo usan jsdom como contenedor DOM mínimo para sanear
 * HTML — así que en el entorno de test basta con un stub inerte que
 * satisfaga la forma que jsdom espera sin implementar nada real.
 */
module.exports = {
  resolve: () => null,
  utils: {
    cssCalc: (value) => value,
    resolveGradient: () => null,
    splitValue: (value) => (typeof value === 'string' ? value.split(',') : []),
  },
};
