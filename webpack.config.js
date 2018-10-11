const path = require('path');

console.log("test");
module.exports = {
  entry: './src/js/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
        {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            },{
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }
            ]
    }]
}
};