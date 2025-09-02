import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
    // ✅ AQUÍ AFEGIM LA REGLA PER DESACTIVAR L'ERROR DELS APÒSTROFS
    {
      rules: {
        "react/no-unescaped-entities": "off",
        "react/jsx-key": "off",              // ✅ AFEGIM AQUESTA LÍNIA

      },
    },
];

export default eslintConfig;
