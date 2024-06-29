/** @type {import('jest').Config} */
const config = {
  modulePathIgnorePatterns: ["dist"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^(.+?)\\.js$": "$1", // Redirect .js imports to .ts
  },
};

export default config;
