const Koa = require('koa')
const Serve = require('koa-static')

const app = new Koa()

app.use(Serve(__dirname + '/client'));
const port = 3003

app.listen(port,()=>{
  console.log(`${port} is listen`)
})