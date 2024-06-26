/** @type {import('jest').Config} */
const config = {
  modulePathIgnorePatterns: ["dist"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};

export default config;