import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default ({ command }) => {
  // 以gh-pages為主時使用這個
  // const base = command === 'build' ? '/vue2023-mainmission/' : '/'; // 以vercel託管為主時使用這個
  const base = command === 'build' ? '/' : '/'

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0'
    },
    base
  })
}
