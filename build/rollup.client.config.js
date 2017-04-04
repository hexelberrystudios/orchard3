import vue from 'rollup-plugin-vue2'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import path from 'path'

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  }),
  vue(),
  scss(),
  babel({
    babelrc: true, // rollup needs it's own preset.
    presets: ['es2015-rollup'],
    exclude: 'node_modules/**',
  }),
  nodeResolve({ browser: true, jsnext: true }),
  commonjs(),
  builtins(),
  globals()
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(livereload())
  plugins.push(serve({
    open: true
  }))
}

export default {
  entry: path.resolve(__dirname, '../src/client-entry.js'),
  dest: path.resolve(__dirname, '../public/bundle.js'),
  sourceMap: true,
  format: 'iife',
  moduleName: 'orchard',
  plugins
}