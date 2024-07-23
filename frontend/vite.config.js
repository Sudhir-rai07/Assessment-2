import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    // proxy:{
    //   "/api":{
    //     target: "https://assessment-backend-28ul.onrender.com/",
    //     changeOrigin: true
    //   }
    // }
  }
})
