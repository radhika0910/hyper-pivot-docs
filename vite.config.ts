import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",

  // Optimization for production builds
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries for better caching
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
        },
      },
    },
    // Enable source maps for debugging in production
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  },

  // Server configuration
  server: {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },

  // Preview server configuration
  preview: {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  },
});
