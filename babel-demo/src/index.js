const sum = (a, b) => a + b

// // 新的 API
// Promise.resolve(100).then(data => data);

// // 新的 API
// [10, 20, 30].includes(20)

// ES6 generator 函数（处理异步），被 async/await 代替
function* tell(){
    console.log('执行a处理');
    yield 'a';

    console.log('执行b处理');
    yield 'b';

    console.log('执行c处理');
    yield 'c';
}
let k = tell()
console.log(k.next())
console.log(k.next())
console.log(k.next())
console.log(k.next())


// 语法，符合 ES5 语法规范
// 不处理模块化（webpack）

// 污染全局环境
// window.Promise1 = function() {}
// Array.prototype.includes1 = function () {}

// 使用方
// window.Promise = 'abc'
// Array.prototype.includes = 100
