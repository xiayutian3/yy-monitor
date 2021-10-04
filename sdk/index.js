import perf from './perf'
import resource from './resource'
import errorCatch from './errorCatch'


//性能指标
perf.init((perfData)=>{
  //performance timing
  // console.log('perfData: ', perfData);
  // console.log('perf init')
})

//资源监控
resource.init((resource)=>{
  console.log('resource: ', resource);

})

errorCatch.init(()=>{
  console.log('errorCatch init')
})