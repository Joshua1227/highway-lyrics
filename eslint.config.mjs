import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["coverage/**", "playwright-report/**", "jest.setup.js"],
  },
  ...nextCoreWebVitals,
  ...typescriptConfig,
];

export default eslintConfig;
