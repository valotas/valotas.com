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
    "^react$": "preact/compat",
    "^react-dom/test-utils$": "preact/test-utils",
    "^react-dom$": "preact/compat",
    "^react-dom/server$": "preact/compat/server",
    "^react/jsx-runtime$": "preact/jsx-runtime",
    "^preact(/(.*)|$)": "preact$1",
    "^@testing-library/react$": "@testing-library/preact",
  },
  setupFiles: ["./jest.setup.cjs"],
};

export default config;
