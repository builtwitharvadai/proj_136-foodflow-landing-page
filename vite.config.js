import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          if (/png|jpe?g|svg|gif|webp|avif/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          if (/css/i.test(ext)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },
    
    cssMinify: true,
    cssCodeSplit: true,
    
    sourcemap: false,
    
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    
    target: 'es2015',
  },
  
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
    cors: true,
  },
  
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: true,
  },
  
  optimizeDeps: {
    include: [],
  },
})