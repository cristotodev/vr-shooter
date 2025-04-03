import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/xr'],
  },
  build: {
    chunkSizeWarningLimit: 1600,
  }
})
