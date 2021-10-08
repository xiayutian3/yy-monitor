//发请求 xhr
// $.ajax({
//   url: 'http://localhost:3003/api/detail',
//   method: 'POST',
//   data:JSON.stringify({
//     a:'a',
//     b:'b'
//   })
// }).then(res=>{
//   console.log('res: ', res);
//   // debugger
// }).catch(error=>{
//   console.log('error: ', error);
// })

// fetch 请求
fetch('http://localhost:3003/api/list').then((res) => {
  // console.log('fetch res: ', res);
  // debugger
});


//错误模拟
console.log('start')
function a() {
  b()
}
function b() {
  c()
}
function c() {
  x = y + z
}
a()
console.log('end')