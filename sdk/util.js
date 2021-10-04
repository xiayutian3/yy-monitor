export default {
  //资源加载结束后，调用回调
  onload: (cb)=>{
    if(document.readyState == 'complete'){
      cb()
      return
    }else{
      window.addEventListener('load',()=>{
        cb()
      })
    }
  }
}