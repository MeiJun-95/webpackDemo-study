const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳：根据内容算hash值，内容变，hash变。判断缓存是否失效（性能优化）
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            /*
            Base64是一种用64个字符来表示任意二进制数据的方法。（二进制到字符串的转换方法/ 最常见的二进制编码方法。）
            可用于在HTTP环境下传递较长的标识信息。采用Base64编码具有不可读性，需要解码后才能阅读。

            url-loader:
                将 文件转换成 base64 URI。
                url-loader 功能与 file-loader 相似，但是如果文件小于一个指定的大小他可以返回一个 DataURL。
                另外，如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。
                    url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。
                    再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。
                    当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
          
            url-loader和file-loader是什么关系呢？
                简答地说，url-loader封装了file-loader。
                url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。
                
                通过上面的介绍，我们可以看到，url-loader工作分两种情况：
                    1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
                    2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。
           
            总结：
            1. 适合小尺寸的图片：可使用 base64 ，可减少 HTTP 请求，。
            2. 若大尺寸的图片使用 base 64 的话，会导致数据太大，加载过慢。



                    */    
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 帮助打包时先清空 dist 目录 (output.path 文件夹 )
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]
})
