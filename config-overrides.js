// config-overrides.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

      // ->> mobile로 열 때 활성화 시키기 시작
      /**
       * mobile 작업시 주석 풀고 
       * 기본 url: localhost:3000/mo 
       */

/*
      config.entry = path.resolve(__dirname, 'src/mobile.js');
      
      config.plugins = config.plugins.map((plugin) => {
        if (plugin instanceof HtmlWebpackPlugin) {
          return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/mobile.html'), 
            inject: true,
          });
        }
        return plugin;
      });
*/

      // ->> mobile로 열 때 활성화 시키기 끝




      // test 미사용 
      /*

      config.entry = {
        mobile: path.resolve(__dirname, 'src/mobile.js'),
        pc: path.resolve(__dirname, 'src/index.js')
      };

      config.plugins = [];

      config.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'public/mobile.html'),
          filename: 'mobile.html',
          chunks: ['mobile'], // Use the mobile entry point
          inject: true,
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'public/index.html'),
          filename: 'index.html',
          chunks: ['index'], // Use the pc entry point
          inject: true,
        })
      );
      
      */
      // test 미사용 end

      return config;
    }
  };
