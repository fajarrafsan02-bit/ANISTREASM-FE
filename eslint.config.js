import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  // Konfigurasi JS & React
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  
  // Konfigurasi Tailwind (pakai flat config dari plugin tailwindcss)
  ...tailwindcss.configs["flat/recommended"],
  
  // Override aturan spesifik
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-negative-arbitrary': 'off',
      'tailwindcss/enforces-shorthand': 'off',
      'tailwindcss/no-custom-classname': 'off'
    }
  }
]);