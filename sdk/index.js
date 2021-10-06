import perf from './perf'
import resource from './resource'
import xhrHook from './xhrHook'
import errorCatch from './errorCatch'


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
xhrHook.init((xhrData)=>{
  console.log('xhrData: ', xhrData);
})

//错误捕获
errorCatch.init(()=>{
  console.log('errorCatch init')
})