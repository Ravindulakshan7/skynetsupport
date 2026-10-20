import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: './',
  // Library mode otherwise preserves React's Node-only environment checks.
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  build: {
    outDir: 'assets/spline-robot',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/robot.tsx', import.meta.url)),
      formats: ['es'],
      fileName: () => 'robot-island.js',
      cssFileName: 'robot-island'
    },
    sourcemap: false
  }
})
