/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  modulePathIgnorePatterns: ["dist"],
  transform: {
    "^.+\\.tsx?$": [
      "esbuild-jest", 
      { 
        sourcemap: true,
        jsxFactory: "h",
        jsxFragment: "Fragment",
        loaders: {
          '.spec.ts': 'tsx'
        }
      } 
    ],
  },
  testEnvironment: "jsdom"
};

module.exports = config;
