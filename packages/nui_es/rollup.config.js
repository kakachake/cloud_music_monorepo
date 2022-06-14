import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import rollupTypescript from 'rollup-plugin-typescript2'
import image from '@rollup/plugin-image'
export default [
  {
    input: './src/index.ts',
    resolve: {
      extensions: ['ts', 'tsx', 'js', 'jsx', '.json']
    },
    output: {
      name: 'nui',
      file: './lib/index.js',
      format: 'es'
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }), // 这样 Rollup 能找到 `ms`
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      rollupTypescript(),
      babel({ babelHelpers: 'bundled' }),
      // terser(),
      image(),
      postcss({
        extract: true //true：分离出css文件，false：会在style里插入css
      })
    ]
  }
]
