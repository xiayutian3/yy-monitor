//sourceMap 反解
//  需要行号 列号 还有相应的sourcesmap 文件

const fs = require('fs');
const path = require('path');
let sourceMap = require('source-map')

let sourcemapFilePath = path.join(__dirname, './main.bundle.js.map')

let sourceFileMap = {}
let fixPath = (filePath) => {
  return filePath.replace(/\.[\.\/]+/, '')
}

module.exports = async (ctx, next) => {
  //错误在554行 17列
  // col:554  row:17
  if (ctx.path == '/sourcemap') {
    let sourceMapContent = fs.readFileSync(sourcemapFilePath, 'utf-8') //json格式
    let fileObj = JSON.parse(sourceMapContent) //对象形式
    let { sources } = fileObj

    //修复前 "webpack:///./react-app.js",
    // 修复后 webpack:///react-app.js
    //sourceFileMap key是修复后的path   value是修复前的path
    sources.map(item => {
      sourceFileMap[fixPath(item)] = item
    })

    let line = 554
    let column = 17

    //source-map 获取
    const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
    let res = consumer.originalPositionFor({ line, column });

    //指向源码文件路径
    let originSource = sourceFileMap[res.source]
    //指向源码文件内容
    let sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)]
    //指向源码文件内容 分割成数组
    let sourcesContentArr = sourcesContent.split('\n')



    ctx.body = { sourcesContentArr, sourcesContent, originSource, res }
  }


  return next()
}