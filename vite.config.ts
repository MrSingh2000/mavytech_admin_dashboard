import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allows access from any IP address
    port: 3000, // Change to your desired port
  },
  plugins: [react()],
})
