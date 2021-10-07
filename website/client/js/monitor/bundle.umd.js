(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // 请求监控

  var xhrHook = {
    init: function init(cb) {
      console.log(123);
      //xhr hook 
      var xhr = window.XMLHttpRequest;
      if (xhr._yy_monitor_flag === true) {
        return;
      }
      xhr._yy_monitor_flag = true;

      //修改原型上的open方法
      var _originOpen = xhr.prototype.open;
      xhr.prototype.open = function (method, url, async, user, password) {
        //信息统计
        this._yy_xhr_info = {
          method: method,
          url: url,
          status: null
        };
        return _originOpen.apply(this, arguments);
      };

      //修改原型上的send方法
      var _originSend = xhr.prototype.send;
      xhr.prototype.send = function (value) {
        var _self = this;
        this._yy_start_time = Date.now();

        var ajaxEnd = function ajaxEnd(eventType) {
          return function () {
            if (_self.response) {
              var responseSize = null;
              switch (_self.responseType) {
                case 'json':
                  // JSON兼容性问题 && stringify报错
                  responseSize = JSON.stringify(_self.response).length;
                  break;
                case 'arraybuffer':
                  responseSize = _self.response.byteLength;
                  break;
                default:
                  responseSize = _self.responseText.length;
                  break;
              }
              //统计信息，扩展信息
              _self._yy_xhr_info.event = eventType;
              _self._yy_xhr_info.status = _self.status;
              _self._yy_xhr_info.success = _self.status === 200;
              _self._yy_xhr_info.duration = Date.now() - _self._yy_start_time;
              _self._yy_xhr_info.responseSize = responseSize;
              _self._yy_xhr_info.requestSize = value ? value.length : 0; //Todo value不一定有length
              _self._yy_xhr_info.type = 'xhr';

              // 上报数据
              cb(_self._yy_xhr_info);
            }
          };
        };

        //这三种状态都代表请求已经结束了，需要统计一些信息，并上报上去
        this.addEventListener('load', ajaxEnd('load'), false); //成功
        this.addEventListener('error', ajaxEnd('error'), false); //失败
        this.addEventListener('abort', ajaxEnd('abort'), false); //取消

        return _originSend.apply(this, arguments);
      };
    }
  };

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
  // console.log('xhrHook: ', xhrHook);
  xhrHook.init(function (infoData) {
    console.log('infoData: ', infoData);
  });

  //错误捕获
  // errorCatch.init(()=>{
  //   console.log('errorCatch init')
  // })

}));
//# sourceMappingURL=bundle.umd.js.map
