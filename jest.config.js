module.exports = {
    preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.jest.json'
      }
    }
};