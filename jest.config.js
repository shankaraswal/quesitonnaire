module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Setup Testing Library
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore specific directories
};
