//资源加载监控
// performance.getEntries()

import util from "./util"

let resolvePerformanceResource = (resourceData) => {
  let r = resourceData
  debugger
  let o = {
    initiatorType: r.initiatorType, //请求资源类型
    name: r.name, //资源名称
    duration: parseInt(r.duration), //请求资源加载了多长时间

    //连接过程
    redirect:r.redirectEnd - r.redirectStart,  //重定向时间
    dns:r.domainLookupEnd - r.domainLookupStart  //DNS查找时间


  };
  return o
}

export default {
  init: (cb) => {
    //资源加载结束后
    util.onload(() => {
      let entries = performance.getEntriesByType('resource');
      // console.log('entries: ', entries);
      let d = resolvePerformanceResource(entries[0])
      debugger;
    })
  }
}