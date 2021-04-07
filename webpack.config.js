const path = require('path');

module.exports = {
  entry: './src/webpack.js',
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       loader: 'ts-loader',
  //       exclude: /node_modules/,
  //     },
  //   ],
  // },
  // resolve: {
  //   extensions: [ '.tsx', '.ts', '.js' ],
  // },
  externals: {
    'window': {},
  },
  output: {
    filename: 'genobank.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web'
}
