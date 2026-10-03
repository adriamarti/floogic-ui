/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import stylex from '@stylexjs/unplugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const isTest = !!process.env.VITEST;

function getStylexPlugin() {
  const plugin = stylex.vite({
    treeshakeCompensation: false,
    useCSSLayers: true,
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir: resolve(__dirname, '..'),
    },
  });
  if (!isTest) return plugin;
  return {
    ...plugin,
    configureServer(server: any) {
      const intervals: NodeJS.Timeout[] = [];
      const origSetInterval = global.setInterval;
      (global as any).setInterval = (...args: any[]) => {
        const id = origSetInterval.apply(global, args as any);
        intervals.push(id);
        return id;
      };
      try {
        plugin.configureServer?.(server);
      } finally {
        global.setInterval = origSetInterval;
      }
      const origClose = server.close?.bind(server);
      if (origClose) {
        server.close = async () => {
          intervals.forEach(id => clearInterval(id));
          return origClose();
        };
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    getStylexPlugin(),
    !isTest && dts({ insertTypesEntry: true })
  ].filter(Boolean),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FloogicUI',
      fileName: (format) => `floogic-ui.${format === 'es' ? 'es.js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@stylexjs/stylex'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime',
          '@stylexjs/stylex': 'stylex'
        }
      }
    }
  }
});
