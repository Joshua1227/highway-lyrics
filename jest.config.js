module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "tsconfig.jest.json",
    }],
    // Add transform for JS files, especially for setup files
    "^.+\\.(js|jsx)$": ["babel-jest", {
      // Jest's default babel config might be sufficient, or specify presets if needed
    }],
  },
  // This is the crucial part to handle CSS imports
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(jest-)?(babel-)?(typescript-)?(uuid|lodash-es|@babel/runtime|@testing-library/react|@testing-library/jest-dom)/)", // Allow specific modules
    "\\.css$", // Explicitly allow CSS files to be processed or mocked
  ],
  testMatch: [
    "**/src/pages/__tests__/**/*.test.tsx",
    "**/src/**/*.test.ts",
    "**/src/**/*.test.tsx",
  ],
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
};
