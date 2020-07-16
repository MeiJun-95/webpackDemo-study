module.exports = {
    plugins: [
        // 需要使用的插件列表
        require('autoprefixer') // autoprefixer这个插件可以帮我们添加厂商前缀
    //  require('postcss-cssnext')   支持使用下一代css语法编写代码，再通过 PostCSS转换成目前浏览器可识别css；同时支持自动为 css 加前缀功能
    ] 
}