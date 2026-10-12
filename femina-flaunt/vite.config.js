import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Allow previewing from any local host binding during QA
    host: true,
    port: 4173,
  },
})
