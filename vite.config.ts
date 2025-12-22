import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
    sparkPlugin() as PluginOption,
    {
      name: 'copy-cname',
      closeBundle() {
        const cnamePath = resolve(projectRoot, 'CNAME')
        const distCnamePath = resolve(projectRoot, 'dist', 'CNAME')
        if (existsSync(cnamePath)) {
          try {
            copyFileSync(cnamePath, distCnamePath)
            console.log('✓ CNAME file copied to dist/')
          } catch (error) {
            console.warn('⚠ CNAME copy failed:', error)
          }
        }
      }
    } as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});
