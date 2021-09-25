import perf from './perf'
import errorCatch from './errorCatch'


perf.init(()=>{
  console.log('perf init')
})
errorCatch.init(()=>{
  console.log('errorCatch init')
})