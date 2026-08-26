module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.(e2e-)?spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@exodus/bytes|@exodus|parse5|entities|@asamuzakjp|marked)/)',
  ],
  moduleNameMapper: {
    '^marked$': '<rootDir>/node_modules/marked/lib/marked.umd.js',
    // Ver comentario junto a transformIgnorePatterns: @asamuzakjp/css-color
    // es ESM puro y su cadena de dependencias (@csstools/*) no se deja
    // transformar por ts-jest. Stub inerte — DOMPurify/jsdom en los tests
    // nunca resuelven colores CSS computados.
    '^@asamuzakjp/css-color$': '<rootDir>/test/stubs/css-color-stub.js',
  },
};


