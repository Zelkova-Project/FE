const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: {
    output: {
      filename: '[name].bundle.js',  // Generates pc.bundle.js and mobile.bundle.js
      path: path.resolve(__dirname, './dist')
    },
    plugins: [
      // HtmlWebpackPlugin for PC (desktop)
      new HtmlWebpackPlugin({
        template: './public/index.html',  // HTML template for PC
        filename: 'pc.html',           // Output file
        chunks: ['pc']                 // Only include the PC bundle
      }),
      // HtmlWebpackPlugin for Mobile
      new HtmlWebpackPlugin({
        template: './public/mobile.html',  // HTML template for Mobile
        filename: 'mobile.html',           // Output file
        chunks: ['mobile']                 // Only include the Mobile bundle
      })
    ],
    configure: {
      entry: './src/mobile.js',
    },
  },
};
