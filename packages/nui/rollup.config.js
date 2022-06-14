import { name } from './package.json'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import postcss from 'rollup-plugin-postcss'
export const file = (type) => `dist/index.${type}.js`

const overrides = {
  compilerOptions: {
    noUnusedParameters: false,
    noUnusedLocals: false,
    strictNullChecks: false,
    moduleResolution: 'node',
    declaration: true, //抽离声明代码 *.d.js
    allowSyntheticDefaultImports: true
  },
  useTsconfigDeclarationDir: true
}
export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'es',
      sourcemap: 'inline',
      globals: {
        react: 'React'
      },
      dir: 'dist'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    postcss({
      extract: true, // 独立导出css文件 ，使用组件时需要单独引入
      namedExports: true,
      minimize: true,
      modules: true,
      extensions: ['.less', '.css']
    }), // 处理css、less 文件
    image(),
    typescript({
      tsconfigOverride: overrides
    }),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'] //允许我们加载第三方模块
    }),
    commonjs() // 转换为ES6版本
  ]
}
