// config-overrides.js

const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
      // Webpack extra entry
      entry: './src/index.js',
      // HTML template used in plugin HtmlWebpackPlugin
      template: './public/index.html',
      // The file to write the HTML to. You can specify a subdirectory
      outPath: '/pc.html'
      // Visit: http[s]://localhost:3000/entry/standard.html
    },
    {
      entry: './src/mobile.js',
      // if [template] is empty, Default value: `public/index.html`
      // template: 'public/index.html',
      template: './public/mobile.html',
      outPath: './mobile.html'
      // Visit: http[s]://localhost:3000/public/login.html
    },
    // {
    //   entry: 'src/entry/404.js',
    //   template: 'public/404.html'
      // if [outPath] is empty, calculated by `path.relative(process.cwd(), template)` --> `public/404.html`
      // outPath: '/public/404.html'
      // Visit: http[s]://localhost:3000/public/404.html
    // },
    // {
    //   entry: 'src/entry/home.js'
      // Default value: `public/index.html`
      // template: 'public/index.html',
      // Calculated by `path.relative(process.cwd(), template)` --> `public/index.html`
      // outPath: '/public/index.html'
      // Visit: http[s]://localhost:3000/public/index.html
    // }
  ]);
  
  module.exports = {
    webpack: function(config, env) {
      multipleEntry.addMultiEntry(config);
      return config;
    }
  };