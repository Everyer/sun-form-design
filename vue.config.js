const isProduction = process.env.NODE_ENV === 'production';
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  resolve
} = require('path');
module.exports = {
  productionSourceMap: !isProduction,

  configureWebpack: {
    // plugins: [
    //     new CopyWebpackPlugin([{
    //             from: 'public/tinymce',
    //             to: 'tinymce',
    //         },
    //         {
    //             from: 'public/js',
    //             to: 'js',
    //         },
    //     ]),
    // ],
  },

  chainWebpack: config => {
    // config.plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  // publicPath: isProduction ? "//res.jzyglxt.com/app/sun_form/" : './',
  publicPath: './',
  devServer: {
    open: true,
    host: 'localhost',
    port: 9999,
    https: false,
    hotOnly: true,
    // http 代理配置
    proxy: {
      '/': {
        // target: 'http://115.239.188.150:11900/',
        // target: 'http://szjg.ymjgjt.com/',
        target: 'http://114.55.252.66:7654/',
        // target: 'http://192.168.18.103:8080/',

        // target: 'http://tzjzy.jsj.zjtz.gov.cn/',
        changeOrigin: true
      }
    },
    before: (app) => { }
  }
};
