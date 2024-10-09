import type {Config} from 'jest';
import {createDefaultPreset} from 'ts-jest';
import path from 'path';
const rootDirector = path.resolve(__dirname);

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  rootDir: rootDirector,
  roots: [rootDirector],
  testEnvironment: "node",
  transform: {
    ...createDefaultPreset().transform,
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: ['((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$'],
  setupFiles: ["<rootDir>/setup-file.ts"],
};

export default config;
