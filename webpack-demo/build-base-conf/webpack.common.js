/*
webpack基本配置：
   1 拆分配置和merge
   2 启动本地服务
   3 处理ES6
   4 处理样式
   5 处理图片
   6 模块化

*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index'),  // 入口文件
    module: {  //module里是每一个loader
        rules: [
            {
                // 处理ES6
                test: /\.js$/,  //验证规则                        
                loader: ['babel-loader'], // 通过'babel-loader' 处理， 用到babel要配置 .babelrc文件：  "presets": ["@babel/preset-env"], //包含es6、7、8常用语法
                include: srcPath, //处理那些文件下的js
                exclude: /node_modules/  //排除这个文件下的  因为这个文件下的模块都是处理好的。
            },
            // {
                // 处理vue
            //     test: /\.vue$/,    
            //     loader: ['vue-loader'], // install 
            //     include: srcPath
            // },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前（知识点）
            //     loader: ['style-loader', 'css-loader']// 1、'css-loader' 以.css结尾的文件，可以解析出css文件。2、'style-loader'：将css插入页面中
            // },
            {
                //处理样式
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss：为了添加浏览器兼容性（浏览器前缀）需要配置 postcss.config.js 文件
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),//将这条路径输出到 'index.html' 文件中
            filename: 'index.html'
        })
    ]
}
