const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/***
 * * CRA로 만들어서 entry point 한개
 * * 여러개 생성을 위해 CRA가 만든 웹팩 config override 해주는 라이브러리 사용
 * ! HtmlWebpackPlugin으로 멀티 엔트리 만들어서, react-app-rewire-multiple-entry 주석처리 (20241128)
 */

// const multipleEntry = require('react-app-rewire-multiple-entry')([
//     {
//       // Webpack extra entry
//       entry: './src/index.js',
//       // HTML template used in plugin HtmlWebpackPlugin
//       template: './public/index.html',
//       // The file to write the HTML to. You can specify a subdirectory
//       outPath: '/pc.html'
//       // Visit: http[s]://localhost:3000/entry/standard.html
//     },
//     {
//       entry: './src/mobile.js',
//       // if [template] is empty, Default value: `public/index.html`
//       // template: 'public/index.html',
//       template: './public/mobile.html',
//       outPath: './mobile.html'
//       // Visit: http[s]://localhost:3000/public/login.html
//     },
//   ]);

// ! HtmlWebpackPlugin으로 멀티 엔트리 만들어서, react-app-rewire-multiple-entry 주석처리 (20241128)

module.exports = {
    webpack: function(config, env) {
      // * HtmlWebpackPlugin으로 멀티 엔트리 만들어서, multipleEntry 주석처리 (20241128)
      // multipleEntry.addMultiEntry(config); 
      
      // * 간접경로 사용을 피하기 위해 디렉토리 alias 설정
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': path.resolve(__dirname, 'src')
      };

      // * 새롭게 HtmlWebpackPlugin 넣기위해 정제
      config.plugins = config.plugins.filter(plugin => !(plugin instanceof HtmlWebpackPlugin)); 

      // * plugins 같은 내용 있어도 무관. 청크 단위로 웹팩이 기능 수행하는 걸로 보임
      config.plugins.push(
        new HtmlWebpackPlugin({
          inject: true,
          template: path.resolve(__dirname, 'public/index.html'), 
          filename: 'index.html',          
          chunks: ['main'],                
        }),
        new HtmlWebpackPlugin({
          inject: true,
          template: path.resolve(__dirname, 'public/mobile.html'), 
          filename: 'mobile.html',           
          chunks: ['mobile'],                
        })
      );

      return config;
    }
  };

