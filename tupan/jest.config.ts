/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  preset: 'ts-jest',
  setupFilesAfterEnv: ['tupan/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['tupan/src/**/*.{test,spec}.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Ignora imports de estilos
  },
};

export default config;
