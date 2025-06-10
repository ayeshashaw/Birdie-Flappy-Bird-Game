import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/users': {
        target: 'https://birdie-flappy-bird-game.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  }, // ← You were missing this comma
  plugins: [react()],
})
