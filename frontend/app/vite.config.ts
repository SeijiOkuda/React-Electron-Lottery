import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 開発サーバーが自動でブラウザを開くようにする
  },
  build: {
    outDir: 'dist',
  },
})
