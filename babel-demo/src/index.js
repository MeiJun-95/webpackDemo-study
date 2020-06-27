
// 因为在.babelrc 中配置了 按需引入，所以这里不需要 import 所有的 @babel/polyfill
// import '@babel/polyfill'

const sum = (a, b) => a + b


// // ES6 generator 函数（处理异步），被 async/await 代替
// function* tell(){
//     console.log('执行a处理');
//     yield 'a';

//     console.log('执行b处理');
//     yield 'b';

//     console.log('执行c处理');
//     yield 'c';
// }
// let k = tell()
// console.log(k.next())
// console.log(k.next())
// console.log(k.next())
// console.log(k.next())

// 新的 API
Promise.resolve(100).then(data => data);

// 新的 API
[10, 20, 30].includes(20)

/*
babel特点：
    1、babel 只是解析语法的。只要语法符合就行，不管这个API是否支持。这里的话，语法是符合 ES5 语法规范
    2、babel不处理模块化，如果 import '@babel/polyfill'，只是引入了这个模块，但没有处理。处理模块化是 webpack 的功能。 所以babel+webpack：要配合

babel-polyfill 按需引入：
    1、文件较大
    2、只有一部分功能，无需全部引入（这里只用了Promise includes）
    3、配置按需引入

babel-polyfill 的问题
    1、会污染全局环境
    2、如果做一个独立的web系统，无碍  （自己用）
    3、如果做一个第三方 lib（库），则有问题  （自己做好，给别人用）


如果单独使用 babel-polyfill 来给关键字打补丁，要有以下定义：...。   但： 污染全局环境
    window.Promise = function() {}
    Array.prototype.includes = function () {}

如果使用方自己定义了这个关键字。则会出bug。
    window.Promise = 'abc'
    Array.prototype.includes = 100

所以解决办法是：  重新定义一个名字来代替这个关键字。    引出 babel-runtime
    window.Promise1 = function() {}
    Array.prototype.includes1 = function () {}

babel-runtime 配置，不会污染全局环境，eg：_promsie ——> Promise     _includes ——> includes
*/