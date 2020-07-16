/*
    优化 babel-loader
    IgnorePlugin：避免引入无用模块
    noParse：避免重复打包
    happyPack：多进程打包工具
    ParallelUgligyPlugin：多进程进行代码压缩
    自动刷新
    热更新：不需要更新代码就生效
    DllPlugin：针对体积较大的插件，不需要每个都打包，打包成一个，引入
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
                // babel-loader
            }
        ],
        // 3.3 noParse：避免重复打包。   与 IgnorePlugin 的比较：引入，但不打包
        // 独立完整的'react.min.js' 文件就不用采用模块化
        // 忽略对 'react.min.js' 文件的递归解析处理
        noParse:[/react\.min\.js$/]          //可选的配置项，类型为RegExp [RegExp] function中的一种
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
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'vendor', 'common']  // 考虑代码分割
        })
    ]
}
