import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Maintains the '@' alias pointing to the src directory
      '@': path.resolve(__dirname, './src'),
    },
    // We add 'ts' and 'tsx' explicitly to ensure the resolver 
    // finds your hook and component files even if they are deeply nested
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
});