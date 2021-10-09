(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

  //错误捕获监控

  var formatError = function formatError(errorObj) {
    // debugger
    // 兼容 火狐 苹果浏览器
    var col = errorObj.column || errorObj.columnNumber;
    var row = errorObj.line || errorObj.lineNumber;
    var errorType = errorObj.name;
    var message = errorObj.message;

    var stack = errorObj.stack;

    if (stack) {
      // urlFirstStack 里面有报错url和报错位置
      var matchUrl = stack.match(/https?:\/\/[^\n]+/);
      var urlFirstStack = matchUrl ? matchUrl[0] : '';
      // "http://localhost:3003/js/main.js:32:3)"

      //获取真正的url
      var resourceUrl = '';
      var regUrlCheck = /https?:\/\/(\S)*\.js/;
      if (regUrlCheck.test(urlFirstStack)) {
        resourceUrl = urlFirstStack.match(regUrlCheck)[0];
      }

      //获取报错文件的行列信息
      var stackCol = null;
      var stackRow = null;
      var posStack = urlFirstStack.match(/:(\d+):(\d+)/);
      if (posStack && posStack.length >= 3) {
        var _posStack = _slicedToArray(posStack, 3);

        stackCol = _posStack[1];
        stackRow = _posStack[2];
      }

      return {
        content: stack,
        col: Number(col || stackCol),
        row: Number(row || stackRow),
        errorType: errorType,
        message: message,
        resourceUrl: resourceUrl
      };
    }
  };

  var errorCatch = {
    init: function init(cb) {
      var _origin_error = window.onerror;
      window.onerror = function (message, source, lineno, colno, error) {

        var errorInfo = formatError(error);
        //原本就有的错误
        errorInfo._message = message;
        errorInfo._source = source;
        errorInfo._lineno = lineno;
        errorInfo._colno = colno;

        errorInfo.type = 'error';
        //上报错误信息
        cb(errorInfo);
        _origin_error && _origin_error.apply(window, arguments);
      };
      // cb()
    }
  };

  //性能指标
  // perf.init((perfData)=>{
  //   //performance timing
  //   // console.log('perfData: ', perfData);
  //   // console.log('perf init')
  // })

  //资源监控
  // resource.init((resource)=>{
  //   console.log('resource: ', resource);
  // })

  //请求监控
  // console.log('xhrHook: ', xhrHook);
  // xhrHook.init((infoData)=>{
  //   console.log('infoData: ', infoData);
  // })

  //错误捕获
  errorCatch.init(function (errorInfo) {
    console.log('errorInfo', errorInfo);
  });

}));
//# sourceMappingURL=bundle.umd.js.map
