import { vitePluginForArco } from '@arco-plugins/vite-react';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        universal: resolve('src/universal'),
      },
    },
    build: {
      minify: true,
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    build: {
      copyPublicDir: false,
      minify: true,
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        universal: resolve('src/universal'),
      },
    },
    build: {
      minify: true,
    },
    plugins: [react(), svgr({ exportAsDefault: false }), vitePluginForArco()],
  },
});
