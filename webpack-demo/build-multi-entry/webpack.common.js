
/*
2.1
多入口文件配置：
    1 entry 写多个文件
    2 output 的 filename 根据 entry 的 key 定制一个变量来写输出文件
    3 plugins 中根据每个入口，生成每一个 HtmlWebpackPlugin 实例，注意配置chunks（只引入对应的js包）
    4 生成环境下打包：npm run build, 会将.html 和.js打包文件存入 dist文件夹中（配置）
    5 配置生产环境下：plugins: [ new CleanWebpackPlugin()], 会默认清空 output.path 文件夹, 以便下次打包后文件中只有新的打包的内容
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: {   //多个入口文件
        index: path.join(srcPath, 'index.js'),     //这是js包 根据index这个名字，分析出很多依赖，打出一个包
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前
            //     loader: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html  ——————————> 几个入口文件，生成几个 HtmlWebpackPlugin 实例
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js   ————————> 如果不写chunks，所有的入口js文件都在这个.html文件中引入
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js   这里的key就是 entry中的key
        })
    ]
}
