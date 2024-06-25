/** @type {import('jest').Config} */
const config = {
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
};

export default config;