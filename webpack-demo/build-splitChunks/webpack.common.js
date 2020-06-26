/*
2.3 抽离公共代码：

如果文件中有公共代码（假设代码体积较大）：
如果一个js文件只是修改了小部分代码，hash文件名更新，文件重新加载，公共代码也被重新加载，但是这部分没有改变且体积较大。
所以性能受到影响:增加加载和执行的次数
要做的是：将公共代码部分或第三方模块单独打包，在业务代码中进行引用，结果是：第三方模块命中缓存，加载快

抽离公共代码：
    1 在prod环境下配置 splitChunks(分割代码，并且为每个chunks(代码块)定义名称)
    2 在commonjs中引用 chunks
    3 在prod 的 splitChunks--cacheGroups 下进行公共模块进行配置（要单独打包的大小限制/复用几次才能开始单独打包）

*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),    //创建每个 chunks（代码块）
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
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割                ！！！！chunks的使用
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common']  // 考虑代码分割
        })
    ]
}
