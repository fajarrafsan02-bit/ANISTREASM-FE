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
      // Aktifkan aturan deteksi class tidak dikenal
      'tailwindcss/no-custom-classname': ['warn', {
        // Pastikan path ke file CSS Tailwind (kalau pakai v3 atau v4)
        // Opsional: jika ingin tetap mengizinkan pola tertentu
        whitelist: [],
        // Jika pakai Tailwind v3 dengan file konfigurasi JS, bisa ditentukan
        // config: './tailwind.config.js'
        // Untuk Tailwind v4, cukup pastikan ada file CSS dengan @import "tailwindcss"
      }],
      // Nonaktifkan aturan yang mungkin bentrok
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-negative-arbitrary': 'off',
      'tailwindcss/enforces-shorthand': 'off'
    }
  }
]);