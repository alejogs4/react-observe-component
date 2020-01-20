const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

const { minify } = require("uglify-es")
const { uglify } = require("rollup-plugin-uglify")

const pkg = require("./package.json")
const babelSetup = require("./babel")

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    typescript(),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    babel(babelSetup),
    commonjs(),
    uglify({}, minify)
  ],
  external: [
    ...Object.keys(pkg.dependecies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
}