import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  // Define que a raiz do frontend está na pasta 'client'
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // Alvo final exato que o seu vercel.json precisa ler
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  }
});
