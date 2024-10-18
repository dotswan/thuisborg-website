import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/template": {
        target: "http://localhost:5173/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/template/, ""),
      },
    },
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
  ],
  build: {
    // Correct the path to main.js
    rollupOptions: {
      input: "/src/js/main.js", // Make sure this points to your main.js file
      output: {
        entryFileNames: "assets/js/app.js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "assets/css/app.css";
          else {
            return "assets/[name][extname]";
          }
        },
      },
    },
    cssCodeSplit: false, // Keep all CSS in one file
    assetsInlineLimit: 0, // Do not inline assets
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Existing alias
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)), // Alias for styles
    },
  },
});
