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
    let matchUrl = stack.match(/https?:\/\/[^\n]+/)
    let urlFirstStack = matchUrl ? matchUrl[0] : ''
    debugger
  }
}

export default {
  init: (cb) => {
    let _origin_error = window.onerror
    window.onerror = function (message, source, lineno, colno, error) {

      let errorInfo = formatError(error)
      errorInfo.type = 'error'
      _origin_error && _origin_error.apply(window, arguments)
    }
    // cb()
  }
}