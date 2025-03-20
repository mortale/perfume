import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    include: [
      'bootstrap',
      'bootstrap/dist/css/bootstrap.min.css',
      'bootstrap/dist/js/bootstrap.bundle.min.js'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
})