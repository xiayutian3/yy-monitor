(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  //性能统计

  var perf = {
    init: function init(cb) {
      // cb();

      var isDOMReady = false;
      var isOnload = false;
      var cycleTime = 100; //这个时间可以延长一点，1 、2 、3s，不影响数据

      // 过滤无效数据；
      function filterTime(a, b) {
        return a > 0 && b > 0 && a - b >= 0 ? a - b : undefined;
      }

      var Util = {
        getPerfData: function getPerfData(p) {

          // let data = {
          //   //网络建连
          //   prevPage: p.fetchStart - p.navigationStart, //上一个页面的时间
          //   redirect: p.redirectEnd - p.redirectStart, //重定向时间
          //   dns: p.domainLookupEnd - p.domainLookupStart,//DNS查找时间
          //   connect: p.connectEnd - p.connectStart,//TCP建连时间
          //   network: p.connectEnd - p.navigationStart, //网络总耗时

          //   //网络接收
          //   send: p.responseStart - p.requestStart, //前端从发送到接受的时间
          //   receive: p.responseEnd - p.responseStart, //接受数据用时
          //   request: p.responseEnd - p.requestStart,  //请求页面的总耗时


          //   //前端渲染
          //   dom: p.domComplete - p.domLoading,  // dom解析时间
          //   loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
          //   frontend: p.loadEventEnd - p.domLoading, //前端总时间

          //   //关键阶段
          //   load: p.loadEventEnd - p.navigationStart, //页面完全加载的时间
          //   domReady: p.domContentLoadedEventStart - p.navigationStart, //dom准备好时间
          //   interactive: p.domInteractive - p.navigationStart, //可操作时间
          //   ttfb: p.responseStart - p.navigationStart, //首字节时间
          // }


          //过滤无效数据

          var data = {
            //网络建连
            prevPage: filterTime(p.fetchStart, p.navigationStart), //上一个页面的时间
            redirect: filterTime(p.redirectEnd, p.redirectStart), //重定向时间
            dns: filterTime(p.domainLookupEnd, p.domainLookupStart), //DNS查找时间
            connect: filterTime(p.connectEnd, p.connectStart), //TCP建连时间
            network: filterTime(p.connectEnd, p.navigationStart), //网络总耗时

            //网络接收
            send: filterTime(p.responseStart, p.requestStart), //前端从发送到接受的时间
            receive: filterTime(p.responseEnd, p.responseStart), //接受数据用时
            request: filterTime(p.responseEnd, p.requestStart), //请求页面的总耗时


            //前端渲染
            dom: filterTime(p.domComplete, p.domLoading), // dom解析时间
            loadEvent: filterTime(p.loadEventEnd, p.loadEventStart), // loadEvent时间
            frontend: filterTime(p.loadEventEnd, p.domLoading), //前端总时间

            //关键阶段
            load: filterTime(p.loadEventEnd, p.navigationStart), //页面完全加载的时间
            domReady: filterTime(p.domContentLoadedEventStart, p.navigationStart), //dom准备好时间
            interactive: filterTime(p.domInteractive, p.navigationStart), //可操作时间
            ttfb: filterTime(p.responseStart, p.navigationStart) //首字节时间
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
              timer = setTimeout(runCheck, cycleTime);
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
          if (isOnload == true) return;
          var timer = null;

          var runCheck = function runCheck() {
            if (performance.timing.loadEventEnd) {
              //1.停止循环检测，2.运行callback
              clearTimeout(timer);
              callback();
              isOnload = true;
            } else {
              //再去循环检测
              timer = setTimeout(runCheck, cycleTime);
            }
          };

          if (document.readyState == 'complete') {
            callback();
            return;
          }
          window.addEventListener('load', function () {
            //开始循环检测，是否 load 已经完成
            runCheck();
          }, false);
        }
      };
      var performance = window.performance;

      Util.domready(function () {
        var perfData = Util.getPerfData(performance.timing);
        // console.log('perfData', perfData)
        perfData.type = 'domready';
        // 获取到数据应该给sdk上层 去上传这个数据
        // debugger
        cb(perfData);
      });
      Util.onload(function () {
        var perfData = Util.getPerfData(performance.timing);
        // console.log('perfData', perfData)
        perfData.type = 'onload';
        // 获取到数据应该给sdk上层 去上传这个数据
        // debugger
        cb(perfData);
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

  //用户的行为路径记录
  // xpath: /html/body/ul[1]/li[1]  xpath 的下标没有0 ，从1开始的 

  //
  var getIndex = function getIndex(ele) {
    var children = [].slice.call(ele.parentNode.children);
    var myIndex = null;
    var len = children.length;

    //只获取种类相同的元素
    children = children.filter(function (node) {
      return node.tagName === ele.tagName;
    });

    for (var i = 0; i < len; i++) {
      if (ele === children[i]) {
        myIndex = i;
      }
    }
    // xpath 的下标没有0 ，从1开始的  返回结果 [1]
    myIndex = '[' + (myIndex + 1) + ']';
    var tagName = ele.tagName.toLowerCase();
    var myLabel = tagName + myIndex;
    return myLabel;
  };
  var getXpath = function getXpath(ele) {

    //边界条件，不需要获取
    //点击的是不是元素
    if (!(ele instanceof Element)) {
      return void 0;
    }

    //点击是不是文本
    if (ele.nodeType !== 1) {
      return void 0;
    }

    //是不是点击了body
    var rootElement = document.body;
    if (ele === rootElement) {
      return void 0;
    }

    var xpath = '';
    var currentEle = ele;
    while (currentEle !== document.body) {
      xpath = getIndex(currentEle) + '/' + xpath;
      debugger;
      currentEle = currentEle.parentNode;
    }
    debugger;
  };

  var behavior = {
    init: function init(cb) {
      document.addEventListener('click', function (e) {
        var target = e.target;
        getXpath(target);
      }, false);

      cb();
    }
  };

  //性能指标
  perf.init(function (perfData) {
    //performance timing
    console.log('perfData: ', perfData);
    // console.log('perf init')
  });

  //资源监控
  // resource.init((resource)=>{
  //   console.log('resource: ', resource);
  // })

  //请求监控
  // console.log('xhrHook: ', xhrHook);
  // xhrHook.init((infoData)=>{
  //   console.log('infoData: ', infoData);
  // })

  // //错误捕获
  // errorCatch.init((errorInfo)=>{
  //   console.log('errorInfo',errorInfo)
  // })

  //用户的行为路径记录
  behavior.init(function (behaviorPath) {
    console.log('behaviorPath: ', behaviorPath);
  });

  //上报的方式 35字节 1x1的gif  大概形式
  // new Image(`http://akhdskjfh.gif?type=error&data=JSON.stringify(${infoData})`)

}));
//# sourceMappingURL=bundle.umd.js.map
