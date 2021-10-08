(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //错误捕获监控

  var formatError = function formatError(errorObj) {
    // debugger
    // 兼容 火狐 苹果浏览器
    errorObj.column || errorObj.columnNumber;
    errorObj.line || errorObj.lineNumber;
    errorObj.name;
    errorObj.message;

    var stack = errorObj.stack;

    if (stack) {
      var matchUrl = stack.match(/https?:\/\/[^\n]+/);
      matchUrl ? matchUrl[0] : '';
      debugger;
    }
  };

  var errorCatch = {
    init: function init(cb) {
      var _origin_error = window.onerror;
      window.onerror = function (message, source, lineno, colno, error) {

        var errorInfo = formatError(error);
        errorInfo.type = 'error';
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
  errorCatch.init(function () {
    console.log('errorCatch init');
  });

}));
//# sourceMappingURL=bundle.umd.js.map
