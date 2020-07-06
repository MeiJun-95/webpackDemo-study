/**
 * @description 常用文件夹路径
 * @author 双越
 */

const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')  //..代表上一级文件
const distPath = path.join(__dirname, '..', 'dist')
/*
path.join([...paths])  ：方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
    ...paths <string> 路径片段的序列。
    返回: <string>

eg:
    path.join('/目录1', '目录2', '目录3/目录4', '目录5', '..');
    // 返回: '/目录1/目录2/目录3/目录4'

    path.join('目录1', {}, '目录2');
    // 抛出 'TypeError: Path must be a string. Received {}'
*/

/*
模块作用域#
__dirname :<string>   ：当前模块的目录名。 相当于 __filename 的 path.dirname()。

eg，从 /Users/mjr 运行 node example.js：

    console.log(__dirname);   // 打印: /Users/mjr
    console.log(path.dirname(__filename));   // 打印: /Users/mjr
*/

module.exports = {
    srcPath,
    distPath
}
