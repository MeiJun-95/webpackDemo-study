const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge') //install 'webpack-merge',引入smart
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {  //通过smart(webpackCommonConf)引入公共配置
    mode: 'development',
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
            /*
            file-loader:
                如果我们希望在页面引入图片（包括img的src和background的url）。当我们基于webpack进行开发时，引入图片会遇到一些问题。
                其中一个就是引用路径的问题。
                    拿background样式用url引入背景图来说，webpack最终会将各个模块打包成一个文件，
                    因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。
                    这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），
                    根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。
            */
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {   //在开发环境下，会定义 本地服务
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        // 设置代理  跨域请求其他接口 
        // 参考网站：https://segmentfault.com/a/1190000016199721#item-1
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {    //路径重写，也就是说会修改最终请求的API路径。  这个参数的目的是给代理命名后，在访问时把命名删除掉。
                    '^/api2': ''
                },
                // changeOrigin: true,     // target是域名的话，需要这个参数，
                // secure: false,          // 设置支持https协议的代理
            }
        }
    }
})
