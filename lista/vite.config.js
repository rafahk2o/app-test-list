import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Server configurations for Docker
  server: {
    host: true, // Needed for docker container port mapping
    strictPort: true,
    port: 5173, // You can change this port if needed
    watch: {
      usePolling: true // Needed for Windows Docker compatibility
    }
  },

  // Preview configurations for production
  preview: {
    host: true,
    port: 5173,
    strictPort: true
  },

  // Build configurations
  build: {
    // Generate source maps for production build
    sourcemap: true,
    
    // Configure output directory
    outDir: 'dist',
    
    // Clean the output directory before build
    emptyOutDir: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: []
    }
  }
})