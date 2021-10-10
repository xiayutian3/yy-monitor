import perf from './perf'
import resource from './resource'
import errorCatch from './errorCatch'
import xhrHook from './xhrHook'
import behavior from './behavior'


//性能指标
perf.init((perfData)=>{
  //performance timing
  console.log('perfData: ', perfData);
  // console.log('perf init')
})

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
behavior.init((behaviorPath)=>{
  console.log('behaviorPath: ', behaviorPath);
})


//上报的方式 35字节 1x1的gif  大概形式
// new Image(`http://akhdskjfh.gif?type=error&data=JSON.stringify(${infoData})`)