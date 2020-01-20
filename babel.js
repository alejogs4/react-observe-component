module.exports = {
  babelrc: false,
  exclude: "node_modules/**",
  presets: ["@babel/react", "@babel/preset-env"],
  plugins: [
    "@babel/plugin-transform-react-jsx"
  ]
};