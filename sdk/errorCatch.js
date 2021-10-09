//错误捕获监控

let formatError = (errorObj) => {
  // debugger
  // 兼容 火狐 苹果浏览器
  let col = errorObj.column || errorObj.columnNumber
  let row = errorObj.line || errorObj.lineNumber
  let errorType = errorObj.name
  let message = errorObj.message

  let { stack } = errorObj
  if (stack) {
    // urlFirstStack 里面有报错url和报错位置
    let matchUrl = stack.match(/https?:\/\/[^\n]+/)
    let urlFirstStack = matchUrl ? matchUrl[0] : ''
    // "http://localhost:3003/js/main.js:32:3)"

    //获取真正的url
    let resourceUrl = '';
    let regUrlCheck = /https?:\/\/(\S)*\.js/
    if(regUrlCheck.test(urlFirstStack)){
      resourceUrl = urlFirstStack.match(regUrlCheck)[0]
    }

    //获取报错文件的行列信息
    let stackCol = null
    let stackRow = null
    let posStack = urlFirstStack.match(/:(\d+):(\d+)/)
    if(posStack && posStack.length>=3){
      [,stackCol,stackRow] = posStack
    }
    
    return {
      content:stack,
      col:Number(col || stackCol),
      row:Number(row || stackRow),
      errorType, 
      message, 
      resourceUrl
    }
  }
}

export default {
  init: (cb) => {
    let _origin_error = window.onerror
    window.onerror = function (message, source, lineno, colno, error) {

      let errorInfo = formatError(error)
      //原本就有的错误
      errorInfo._message = message
      errorInfo._source = source
      errorInfo._lineno = lineno
      errorInfo._colno = colno

      errorInfo.type = 'error'
      //上报错误信息
      cb(errorInfo)
      _origin_error && _origin_error.apply(window, arguments)
    }
    // cb()
  }
}