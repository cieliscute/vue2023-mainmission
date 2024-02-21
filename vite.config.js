import { fileURLToPath, URL } from 'node:url';
import eslintPlugin from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ command }) => {
  // 以gh-pages為主時使用這個
  // const base = command === 'build' ? '/vue2023-mainmission/' : '/'; // 以vercel託管為主時使用這個
  const base = command === 'build' ? '/' : '/';

  return defineConfig({
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5174,
    },
    base,
  });
};
