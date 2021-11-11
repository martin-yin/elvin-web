import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const pathResolve = (dir: string) => resolve(__dirname, '.', dir)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8012,
    open: true
  },
  plugins: [
    react({
      babel: {
        parserOpts: { plugins: ['decorators-legacy'] }
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /~antd/,
        replacement: pathResolve('node_modules') + '/antd'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
