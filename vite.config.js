import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173, // Change if needed
    strictPort: true, // Ensure the port doesn't change
    allowedHosts: ['.ngrok-free.app'], // Allow all Ngrok subdomains
    cors: true, // Enable CORS for external access
  }
})
