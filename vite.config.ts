import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@apis', replacement: '/src/apis' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@components', replacement: '/src/components' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@store', replacement: '/src/store' },
      { find: '@storage', replacement: '/src/storage' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@type', replacement: '/src/types' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@routes', replacement: '/src/routes' },
    ],
  },
});
