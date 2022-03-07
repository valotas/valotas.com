/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
//eslint-disable-next-line
module.exports = {
  modulePathIgnorePatterns: ["dist"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  // strip .js off the import before importing it
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/emptyImport.ts",
  },
  setupFiles: ["./jest.setup.cjs"],
};
