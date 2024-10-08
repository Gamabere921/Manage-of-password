import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext' // Asegúrate de que el destino de construcción sea compatible con ESM
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      host: '172.28.0.2', // o la IP/hostname de tu servidor
    },
  },
});
