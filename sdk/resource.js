//资源加载监控
// performance.getEntries()

import util from "./util"

let resolvePerformanceResource = (resourceData) => {
  let r = resourceData
  // debugger
  let o = {
    initiatorType: r.initiatorType, //请求资源类型
    name: r.name, //资源名称
    duration: parseInt(r.duration), //请求资源加载了多长时间

    //连接过程
    redirect: r.redirectEnd - r.redirectStart,  //重定向时间
    dns: r.domainLookupEnd - r.domainLookupStart,  //DNS查找时间
    connect: r.connectEnd - r.connectStart,  //TCP建连
    network: r.connectEnd - r.startTime,  //网络总耗时

    //接受过程
    send: r.responseStart - r.requestStart,  //发送开始到接受第一个返回
    receive: r.responseEnd - r.responseEnd,  //接收总时间
    request: r.responseEnd - r.requestStart,  //总时间

    //核心指标
    ttfb: r.responseStart - r.requestStart,  //首字节时间


  };
  return o
}

//帮助循环获得每一个资源的性能数据
let resolveEntries = (entries) => {
  return entries.map(entry => {
    return resolvePerformanceResource(entry)
  })
}

export default {
  init: (cb) => {
    if (window.PerformanceObserver) {
      //动态获得每一个资源信息
      let observer = new window.PerformanceObserver((list) => {
        try {
          let entries = list.getEntries()
          let entriesData = resolveEntries(entries);
          //上报数据
          cb(entriesData)
        } catch (error) {
          console.error(error)
        }
      })
      observer.observe({ entryTypes: ['resource'] })
    } else {
      //资源加载结束后
      util.onload(() => {
        //在onload之后获得所有的资源信息
        let entries = performance.getEntriesByType('resource');
        let entriesData = resolveEntries(entries);
        //上报数据
        cb(entriesData)
      })
    }
  }
}