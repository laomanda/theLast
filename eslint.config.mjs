import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    ".next-dev-*/**",
    ".next-e2e-*/**",
    ".next-e2e/**",
    "out/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "assets-final/**",
    "BIRTHDAY_SVG_REV5/**",
    "font/**",
    "next-env.d.ts",
  ]),
]);
