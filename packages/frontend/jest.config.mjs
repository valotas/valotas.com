/** @type {import('jest').Config} */
const config = {
  modulePathIgnorePatterns: ["dist"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  // strip .js off the import before importing it
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/emptyImport.ts",
  },
  setupFiles: ["./jest.setup.mjs"],
  extensionsToTreatAsEsm: [".tsx", ".ts"],
};

export default config;
