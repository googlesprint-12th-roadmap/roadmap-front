import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://7c5a-219-255-199-146.jp.ngrok.io',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
