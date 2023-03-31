import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/unit-converter-react/",
  plugins: [
    react({ jsxRuntime: "classic" }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "UnitConverter",
        short_name: "PWA",
        description: "My Awesome Unit Converter",
        theme_color: "#ffffff",
        icons: [
          {
            src: "react.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "react.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
		devOptions: { enabled: true },
      },
    }),
  ],
});
