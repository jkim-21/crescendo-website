import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
  },
  plugins: [react()],
})
