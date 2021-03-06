// 请求监控

//自身的请求无需拦截，比如上报请求无需拦截

export default {
  init: (cb) => {
    console.log('xhr monitor')
    //xhr hook 
    let xhr = window.XMLHttpRequest
    if (xhr._yy_monitor_flag === true) {
      return
    }
    xhr._yy_monitor_flag = true

    //修改原型上的open方法
    let _originOpen = xhr.prototype.open
    xhr.prototype.open = function (method, url, async, user, password) {
      //信息统计
      this._yy_xhr_info = {
        method,
        url,
        status: null,
      }
      return _originOpen.apply(this, arguments)
    }

    //修改原型上的send方法
    let _originSend = xhr.prototype.send
    xhr.prototype.send = function (value) {
      let _self = this
      this._yy_start_time = Date.now()

      const ajaxEnd = (eventType) => () => {
        if (_self.response) {
          let responseSize = null
          switch (_self.responseType) {
            case 'json':
              // JSON兼容性问题 && stringify报错
              responseSize = JSON.stringify(_self.response).length;
              break;
            case 'arraybuffer':
              responseSize = _self.response.byteLength
              break;
            default:
              responseSize = _self.responseText.length
              break;
          }
          //统计信息，扩展信息
          _self._yy_xhr_info.event = eventType
          _self._yy_xhr_info.status = _self.status
          _self._yy_xhr_info.success = _self.status === 200
          _self._yy_xhr_info.duration = Date.now() - _self._yy_start_time
          _self._yy_xhr_info.responseSize = responseSize
          _self._yy_xhr_info.requestSize = value ? value.length : 0  //Todo value不一定有length
          _self._yy_xhr_info.type = 'xhr'

          // 上报数据
          cb(_self._yy_xhr_info)

        }
      }

      //这三种状态都代表请求已经结束了，需要统计一些信息，并上报上去
      this.addEventListener('load', ajaxEnd('load'), false); //成功
      this.addEventListener('error', ajaxEnd('error'), false); //失败
      this.addEventListener('abort', ajaxEnd('abort'), false); //取消

      return _originSend.apply(this, arguments)
    }


    //fetch hook
    if (window.fetch) {
      let _origin_fetch = window.fetch
      window.fetch = function () {
        let startTime = Date.now()
        let args = [].slice.call(arguments)

        let method = 'GET'
        let url = null

        let fetchInput = args[0]
        if (typeof fetchInput === 'string') {
          url = fetchInput
        } else if ('Request' in window && fetchInput instanceof window.fetch) {
          url = fetchInput.url
          method = fetchInput.method ? fetchInput.method : method
        } else {
          url = '' + fetchInput
        }

        //要上报的数据
        let yy_fetch_data = {
          method, url, status: null
        }
        return _origin_fetch.apply(this, args).then(response => {
          yy_fetch_data.status = response.status
          yy_fetch_data.type = 'fetch'
          yy_fetch_data.duration = Date.now() - startTime
          cb(yy_fetch_data)
          return response
        })
      }
    }
  }
}