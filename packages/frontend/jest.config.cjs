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
  // strip .js off the import before importing it
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less)$": "<rootDir>/dist/__mocks__/emptyImport.js",
  },
  setupFiles: ["./jest.setup.cjs"],
};
