const Koa = require('koa')
const Serve = require('koa-static')
const API  = require('./middleware/api')
const SourceMap = require('./middleware/sourceMap')

const app = new Koa()
const port = 3003

app.use(SourceMap)
app.use(API)
app.use(Serve(__dirname + '/client'));


app.listen(port,()=>{
  console.log(`${port} is listen`)
})