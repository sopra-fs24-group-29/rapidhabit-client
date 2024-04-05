import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "pwa-icon-apple-touch.png"],
      manifest: {
        name: "Rapid Habit",
        short_name: "Rapid Habit",
        theme_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: "pwa-icon-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
