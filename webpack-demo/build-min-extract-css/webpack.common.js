/*
2.2 抽离css文件

一般的css处理：在commonjs中集中处理css，加载到style中。在prod环境下，css代码是被插入到js文件中再被打包。
这样加载css样式只能先加载js文件才能执行css样式。性能降低。
——————>要做的内容：将css抽离出来，使用link引入

css抽离：
    1、 在commonjs中对css处理进行拆分
    2、 在dev环境下就沿用之前的处理，使用style-loader 进行加载到style中
    3. 在prod环境下，使用插件进行css加载，抽离出来后定好文件名（路径/文件名[contentHash].css）,使用hash最大程度上命中缓存，最后进行压缩。

*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            }
            // css 处理 在dev环境下，还是用style做加载。但在prod环境下，从js中抽离css
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
    ]
}
