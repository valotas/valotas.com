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
    // jsdom selects the browser server build, which expects MessageChannel.
    "^react-dom/server$": "react-dom/server.node",
  },
  setupFiles: ["./jest.setup.mjs"],
  extensionsToTreatAsEsm: [".tsx", ".ts"],
};

export default config;
