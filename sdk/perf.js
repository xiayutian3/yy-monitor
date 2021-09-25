
//性能统计

export default {
  init:(cb)=>{
    cb()
    let performance= window.performance;
    console.log('performance: ', performance.timing);
    debugger
  }
}