# webpackDemo-study

# Clone project
git clone https://github.com/MeiJun-95/webpackDemo-study.git

# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build



# Content



DLLPlugin 动态链接库插件
前端框架 vue React，体积大，构建慢
较稳定，不常升级版本
同一版本只构建一次即可，不用每次都重新构建

怎么使用：
 1. webpack已内置 DllPlugin 支持
 2. DllPlugin - 打包出 dll 文件 ： 先用DllPlugin将vue/React打包出一个文件 （中间产物：一个内容，一个索引）
 3. DllReferencePlugin - 使用 dll 文件： 再引用时直接使用这个打包结果就可以，不需要重新打包（只要没升级）
 4. 在html中 设置引用方式：<script src="./react.dll.js"></script>。 
    在webpack中 使用 DllReferencePlugin 设置引用方式（步骤3）
    js中引用方式就不用修改了
    

总结：
webpack 优化构建速度

可用于生产环境：
    优化babel-loader
    IgnorePlugin
    noParse
    happyPack
    ParallelUglifyPlugin（一般不用在开发环境，没有必要）

不能用于生产环境！
    自动刷新
    热更新
    DllPlugin



webpack 性能优化-产出代码
好处：
    体积更小
    合理分包，不重复加载
    速度更快，内存使用更少
方法：
    1. 小图片 base64 编码
    2. bundle + hash
    3. 懒加载 import 语法
    4. 提取公共代码
    5. IngorePlugin
    6. 使用 CDN 加速：
        1. 在prod环境下的output中，配置publicPath ：给所有静态文件url添加cdn前缀。
        2. 将所有静态文件上传至cdn
    7. 使用 Production: 
        1. 自动开启代码压缩 
        2. Vue React 等会自动删掉调试代码（如开发环境的 warning）
        3. 自动启动 Tree-Shaking：某些模块中没有用到的方法不会被打包
            // ES6 Module 才能让 tree-shaking 生效
            // commonjs 就不行
            ES6 Module 和 commonjs 区别
                1. ES6 Module 静态引入，编译时引入
                2. commonjs 动态引入，执行时引入
                3. 只有 ES6 Module 才能静态分析，实现 Tree-Shaking（webpack打包时执行，这时js代码还没有开始执行。webpack打包只是静态分析、编译、构建
            代码示例：
            <!-- commonjs     -->
            let apiList = require('../config/api.js')
            if(isDev){
                apiList = require('../config/api_dev.js') //可以动态引入，执行时引入
            }
            <!-- ES6 Module -->
            import apiList from '../config/api.js'
            if(isDev){
                import apiList from '../config/api_dev.js'//编译时保存，只能静态引入
            }
    8. Scope Hosting 改变打包的作用域，代码执行更快
        多个文件（一个定义，一个引入执行）打包后放入一个压缩文件中，但多个文件对应打包结果中的多个函数。每个函数都有自己的作用域。对js的执行和内存消耗不友好。希望：将有关联的多个函数合并为一个函数执行。
        好处：
            代码体积更小
            创建函数作用域更少
            代码可读性更好
        使用方式：
            引用插件
            开启插件





