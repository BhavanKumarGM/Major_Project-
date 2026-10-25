import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 3045,
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://127.0.0.1:5050',
        changeOrigin: true
      }
    }
  }
});
