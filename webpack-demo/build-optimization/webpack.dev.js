const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');   //3.7.1 热更新。 不用install，直接引用

module.exports = smart(webpackCommonConf, {
    mode: 'development',
    entry: {
        // 3.7.2
        // index: path.join(srcPath, 'index.js'),
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ],
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            {
                //3.1 优化 babel-loader
                test:/\.js$/,
                loader:['babel-loader?cacheDirectory'],   //开启缓存
                include:srcPath,      //明确范围
                // exclude:/node-modules/    //排除范围，include和 exclude 两者选一个即可
            },
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
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
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('development')
        }),
        // 3.7.3 new一个实例
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        hot: true,   // 3.7.4 告诉 devServer 热更新开启

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    },
    // 3.6 自动刷新
    // watch: true, // 开启监听，默认为 false
    // 注意：开启监听滞后，webpack-dev-server 会自动开启刷新浏览器
    
    // watchOptions: {
    //     ignored: /node_modules/, // 忽略哪些
    //     // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    //     aggregateTimeout: 300,   // 默认为 300ms
    //     // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    //     poll: 1000    // 默认每隔1000毫秒询问一次
    // }
})
