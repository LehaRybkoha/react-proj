import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { VitePluginFonts } from "vite-plugin-fonts"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: [
          { name: "Montserrat", styles: "wght@200;300;400;500;600;700;800" },
        ],
      },
    }),
  ],

  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
})
