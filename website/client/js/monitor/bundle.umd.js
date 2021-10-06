(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //错误捕获

  var errorCatch = {
    init: function init(cb) {
      cb();
    }
  };

  //错误捕获
  errorCatch.init(function () {
    console.log('errorCatch init');
  });

}));
//# sourceMappingURL=bundle.umd.js.map
