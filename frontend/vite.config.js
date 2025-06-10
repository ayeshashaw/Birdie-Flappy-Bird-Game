import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/users': {
        target: 'https://birdie-flappy-bird-game.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
