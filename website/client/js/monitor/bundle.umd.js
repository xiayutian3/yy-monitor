(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //性能统计

  var perf = {
    init: function init(cb) {
      cb();

      var isDOMReady = false;

      var Util = {
        getPerfData: function getPerfData(p) {
          var data = {
            //网络建连
            prevPage: p.fetchStart - p.navigationStart, //上一个页面的时间
            redirect: p.redirectEnd - p.redirectStart, //重定向时间
            dns: p.domainLookupEnd - p.domainLookupStart, //DNS查找时间
            connect: p.connectEnd - p.connectStart, //TCP建连时间
            network: p.connectEnd - p.navigationStart, //网络总耗时

            //网络接收
            send: p.responseStart - p.requestStart, //前端从发送到接受的时间
            receive: p.responseEnd - p.responseStart, //接受数据用时
            request: p.responseEnd - p.requestStart, //请求页面的总耗时


            //前端渲染
            dom: p.domComplete - p.domLoading, // dom解析时间
            loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
            frontend: p.loadEventEnd - p.domLoading, //前端总时间

            //关键阶段
            load: p.loadEventEnd - p.navigationStart, //页面完全加载的时间
            domReady: p.domContentLoadedEventStart - p.navigationStart, //dom准备好时间
            interactive: p.domInteractive - p.navigationStart, //可操作时间
            ttfb: p.responseStart - p.navigationStart //首字节时间
          };
          return data;
        },
        //DOM解析完成
        domready: function domready(callback) {
          if (isDOMReady == true) return;
          var timer = null;

          var runCheck = function runCheck() {
            if (performance.timing.domComplete) {
              //1.停止循环检测，2.运行callback
              clearTimeout(timer);
              callback();
              isDOMReady = true;
            } else {
              //再去循环检测
              timer = setTimeout(runCheck, 100);
            }
          };

          if (document.readyState == 'interactive') {
            callback();
            return;
          }
          document.addEventListener('DOMContentLoaded', function () {
            //开始循环检测，是否 DOMContentLoaded 已经完成
            runCheck();
          });
        },
        //页面加载完成
        onload: function onload(callback) {
          if (document.readyState == 'complete') {
            callback();
            return;
          }
        }
      };
      var performance = window.performance;

      Util.domready(function () {
        var perfData = Util.getPerfData(performance.timing);
        console.log('perfData', perfData);
        // 获取到数据应该给sdk上层 去上传这个数据
        debugger;
      });
      Util.onload(function () {
        Util.getPerfData(performance.timing);
        // debugger
      });

      // document.addEventListener('DOMContentLoaded',()=>{
      //   //DOMContentLoaded事件也会存在同样的问题，所以也要加settimeout
      //   // let perfData = Util.getPerfData(performance.timing)
      //   // debugger
      // })

      // window.addEventListener('load', () => {
      //   //获取的结果会不一样 所以会加settimeout，不然某些值会出现负数
      //   // let perfData = Util.getPerfData(performance.timing)
      //   // debugger

      //   setTimeout(() => {
      //     console.log('performance: ', performance.timing);
      //     let perfData = Util.getPerfData(performance.timing)
      //     debugger
      //   }, 100)
      // })
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
