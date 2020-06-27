# webpackDemo-study

# Clone project
git clone https://github.com/MeiJun-95/webpackDemo-study.git

# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build




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
    