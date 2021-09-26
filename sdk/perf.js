
//性能统计

export default {
  init: (cb) => {
    cb();

    let Util = {
      getPerfData: (p) => {
        let data = {
          //网络建连
          prevPage: p.fetchStart - p.navigationStart, //上一个页面的时间
          redirect: p.redirectEnd - p.redirectStart, //重定向时间
          dns: p.domainLookupEnd - p.domainLookupStart,//DNS查找时间
          connect: p.connectEnd - p.connectStart,//TCP建连时间
          network: p.connectEnd - p.navigationStart, //网络总耗时

          //网络接收
          send: p.responseStart - p.requestStart, //前端从发送到接受的时间
          receive: p.responseEnd - p.responseStart, //接受数据用时
          request: p.responseEnd - p.requestStart,  //请求页面的总耗时


          //前端渲染
          dom: p.domComplete - p.domLoading,  // dom解析时间

        }
        return data;
      }
    }
    let performance = window.performance;

    window.addEventListener('load', () => {
      setTimeout(() => {
        console.log('performance: ', performance.timing);
        let perfData = Util.getPerfData(performance.timing)
        debugger

      }, 100)
    })
  }
}