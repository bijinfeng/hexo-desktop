import { vitePluginForArco } from '@arco-plugins/vite-react';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), terser(), cleanup()],
  },
  preload: {
    plugins: [externalizeDepsPlugin(), terser()],
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
      },
    },
    plugins: [
      react(),
      svgr({ exportAsDefault: false }),
      vitePluginForArco(),
      terser(),
      cleanup(),
    ],
  },
});
