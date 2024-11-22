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
  ]);
  
  module.exports = {
    webpack: function(config, env) {
      multipleEntry.addMultiEntry(config);
      
      // 간접경로 사용을 피하기 위해 디렉토리 alias 설정
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': path.resolve(__dirname, 'src')
      };
    

      /**
       * *** start) 모바일 작업시 활성화 시키기 
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
      // *** end) mobile로 열 때 활성화 시키기 
      return config;
    }
  };
