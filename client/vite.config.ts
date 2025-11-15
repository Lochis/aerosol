import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
      secure: false,
      }
    },
  },
  cacheDir: "../node_modules/.vite",
});
