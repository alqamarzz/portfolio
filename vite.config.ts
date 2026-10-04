import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // Set base to repo name for GitHub Pages
  base: '/spiderman-portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/canvas-confetti') || id.includes('node_modules/lucide-react')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
