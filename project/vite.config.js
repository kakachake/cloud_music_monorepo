import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  plugins: [
    react(),
    terser(),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM'
    })
    // compressPlugin({
    //   algorithm: 'gzip', //brotliCompress gzip
    //   deleteOriginFile: true
    // })
    // visualizer({
    //   emitFile: false,
    //   file: 'stats.html', //分析图生成的文件名
    //   open: true //如果存在本地服务端口，将在打包后自动展示
    // })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },

  outDir: './build',
  base: '/'
})
