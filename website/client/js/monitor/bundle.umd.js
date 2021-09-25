(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //性能统计

  var perf = {
    init: function init(cb) {
      cb();
      var performance = window.performance;
      console.log('performance: ', performance.timing);
      debugger;
    }
  };

  //错误捕获

  var errorCatch = {
    init: function init(cb) {
      cb();
    }
  };

  perf.init(function () {
    console.log('perf init');
  });
  errorCatch.init(function () {
    console.log('errorCatch init');
  });

}));
//# sourceMappingURL=bundle.umd.js.map
