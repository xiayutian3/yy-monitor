// 请求监控

export default {
  init:(cb)=>{
    //xhr hook 
    let xhr = window.XMLHttpRequest
    if(xhr._yy_monitor_flag === true){
      return
    }
    xhr._yy_monitor_flag = true

    let _originOpen = xhr.prototype.open
    xhr.prototype.open = function(){
      return _originOpen.apply(this,arguments)
    }
  }
}