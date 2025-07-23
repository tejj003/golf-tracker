import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    port: 3000
  },
  optimizeDeps: {
    exclude: ['@mediapipe/pose', '@mediapipe/camera_utils', '@mediapipe/drawing_utils']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mediapipe': ['@mediapipe/pose', '@mediapipe/camera_utils', '@mediapipe/drawing_utils'],
          'opencv': ['opencv-js'],
          'charts': ['chart.js', 'react-chartjs-2']
        }
      }
    }
  }
})
