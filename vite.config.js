import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const sourceLogo = 'C:/Users/kumar/.gemini/antigravity-ide/brain/62e29995-e9cc-43e8-a7ae-7f2b5566d6f2/media__1786157673957.png'
const targetDir = path.resolve(__dirname, 'public')

if (fs.existsSync(sourceLogo)) {
  const targets = ['logo512.png', 'logo192.png', 'pwa-logo.png', 'apple-touch-icon.png', 'favicon.png']
  targets.forEach(file => {
    fs.copyFileSync(sourceLogo, path.join(targetDir, file))
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
