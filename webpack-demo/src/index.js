// 引入 css
import './style/style1.css'
import './style/style2.less'

import { sum } from './math'  //公共模块

import _ from 'lodash'   //71k (gzipped:24k)     引入第三方模块
console.log(_.each)

// 3.2 避免无用模块引入
import moment from 'moment'  //235.4k(gzipped:66.3k)
import 'moment/locale/zh-cn'   //手动引入需要的语言包 ；  在prod环境下忽略了moment.locale文件： new webpack.IgnorePlugin(/\.\/locale/, /moment/),
moment.locale('zh-cn')   //设置语言为中文
console.log('locale',moment.locale()) 
console.log('date',moment().format('li'))  //2020年xx月xx日
  

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)



function insertImgElem(imgFile){
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from './img/1.png'
insertImgElem(imgFile1)
import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)



// 2.4 引入动态数据 ----懒加载
setTimeout(() => {
    // 回顾vue react 异步组件  不是vue独有，而是es'6支持
    // 定义一个chunk，也会单独打一个包
    import('./dynamic-data.js').then(res => {   //import返回promise
        console.log(res.default.message)   // 注意这里的 default
    },1500)
})

// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }
