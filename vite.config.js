import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

// Auto-discover HTML files in the root directory
const getHtmlEntries = () => {
  const entries = {}
  const files = fs.readdirSync(__dirname)
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '')
      entries[name === 'index' ? 'main' : name] = resolve(__dirname, file)
    }
  })
  
  return entries
}

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
})
