const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config')
const index = require('./routes/index')
const users = require('./routes/users')
const admin = require('./routes/admin')
const category=require('./routes/category')
const article=require('./routes/article')
const comment=require('./routes/comment')
const reply=require('./routes/reply')
const advertise=require('./routes/advertise')

const cors=require('koa-cors')
//全局处理
const errors = require('./core/http-exception')
global.errs = errors;
global.config=config;

const bouncer=require('koa-bouncer');
// error handler
onerror(app)
//错误处理中间件
const catchError=require('./middlewares/exception');

app.use(catchError);
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//注册参数校验的bouncer
app.use(bouncer.middleware())
app.use(json())
app.use(cors())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'hbs',
//   map: { hbs: 'handlebars' }
// }))
const hbs=require('koa-hbs')
const helpers = require('handlebars-helpers')
helpers.comparison({
  handlebars:hbs.handlebars
})
app.use(hbs.middleware({
  viewPath: __dirname + '/views',//视图根目录
  defaultLayout: 'layout',//默认布局页面
  partialsPath: __dirname + '/views/partials',//注册partials目录
  disableCache: true //开发阶段不缓存
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(reply.routes(), reply.allowedMethods())
app.use(advertise.routes(), advertise.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
