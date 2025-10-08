import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react({ jsxRuntime: 'automatic', include: /\.(jsx|js|tsx|ts)$/ })],
    base: '/',
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: { port: 5173, open: true, host: true },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 650,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash][extname]`,
          manualChunks: { vendor: ['react', 'react-dom'] },
        },
      },
    },
    optimizeDeps: { include: ['react', 'react-dom'] },
    define: { __APP_ENV__: JSON.stringify(env.APP_ENV || mode) },
  };
});
