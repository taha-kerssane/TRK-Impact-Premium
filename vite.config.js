import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'env (VITE_*), utiles pour GA4/meta si tu en mets
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        // active les devtools react-refresh
        include: /\.(jsx|js|tsx|ts)$/,
      }),
    ],

    // Base du site (Vercel / GitHub Pages). Garde "/" pour Vercel.
    base: '/',

    // Alias propres (import '@/components/...')
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // Dev server pratique (optionnel)
    server: {
      port: 5173,
      open: true,
      host: true,
    },

    // Build optimisé
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 650, // évite les faux warnings
      rollupOptions: {
        output: {
          // Nommage propre des chunks/assets
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash][extname]`,
          // Petit "manualChunks" pour séparer vendor si besoin
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },

    // Optimisation de deps
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },

    // Expose éventuellement des envs au runtime (si besoin dans App.jsx)
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
    },
  };
});
