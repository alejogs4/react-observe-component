// packages
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

// constants
const pkg = require('./package.json')
const babelSetup = require('./babel')

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    typescript(),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    babel(babelSetup),
    commonjs()
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
}