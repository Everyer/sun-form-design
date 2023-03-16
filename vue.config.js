const isProduction = process.env.NODE_ENV === 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    productionSourceMap: !isProduction,
    configureWebpack: config => {
    },

    chainWebpack: config => {
        // config.plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    publicPath: isProduction ? "//res.jzyglxt.com/app/sun_form/" : './',
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
                target: 'http://47.99.99.19:8800/',
                changeOrigin: true,
            }
        },
        before: (app) => {}
    },
}