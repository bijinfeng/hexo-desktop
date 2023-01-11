import { vitePluginForArco } from '@arco-plugins/vite-react';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

const isAnalyze = process.env?.analyze || false;

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
      isAnalyze
        ? visualizer({
            emitFile: true,
            filename: 'stats.html',
          })
        : null,
    ],
  },
});
