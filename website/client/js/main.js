//发请求
$.ajax({
  url: 'http://localhost:3003/api/detail',
  method: 'POST',
  data:JSON.stringify({
    a:'a',
    b:'b'
  })
}).then(res=>{
  console.log('res: ', res);
  // debugger
}).catch(error=>{
  console.log('error: ', error);
})