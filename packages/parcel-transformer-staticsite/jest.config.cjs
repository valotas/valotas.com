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
};
