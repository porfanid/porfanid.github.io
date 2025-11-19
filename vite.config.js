import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
preview: {
    // This makes the server listen on all addresses, including public ones
    host: true, 
    // This explicitly allows access via your custom domain
    allowedHosts: ["test.orfanidis.net.gr"] 
  }
})
