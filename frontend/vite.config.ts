import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
  // 💡 IMPORTANT → rediriger toutes les routes vers index.html
  resolve: {
    alias: {},
  },
  optimizeDeps: {},
  appType: "spa",
});
