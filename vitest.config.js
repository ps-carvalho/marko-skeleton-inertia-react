import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app/web/resources/js'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/web/resources/js/**/*.test.{js,jsx}'],
    setupFiles: ['app/web/resources/js/test/setup.jsx'],
  },
});
