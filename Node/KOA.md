* new Koa()就是一个应用程序；
* 通过use方法注册中间件，例如：use(func)；
* 多个中间件通过next();顺序调用，不然只会调用注册的第一个；
* 中间件函数要使用async定义，next函数要使用await调用；因为需要所有中间件都是严格按照`洋葱模型`进行执行的；
* await可以用`求值`关键字来理解，对于promise而言不再是返回一个promise，而是直接返回promise的值；

* 传递参数
    1. 通过路由路径，例如：test/:id/index，通过ctx.params.id获取
    2. 通过路由参数，例如：test/index?id=1，通过ctx.request.query.id获取
    3. 通过headers，通过ctx.request.header获取
    4. 通过body，通过ctx.request.body获取

* try……catch……主要针对同步代码，异步代码通过try……catch……不一定能正确捕获异常
* ctx.body如果没有设置任何值就会返回not found
* 对请求的参数要做校验，validate；（validater.js，lodash）
* 需要做全局异常捕获；
* api的数据除了通过ctx.body返回，也可以通过throw（可以丢出错误信息，也可以是正确的信息）；
* session（由于http无状态，所以需要记录用户状态而产生）一般用在webservice有状态机制下，token一般用在REST无状态机制下，两者都是为了验证身份；
* session是保存在服务端的用户状态，cookie是浏览器保存部分用户信息；如果使用session，一般会在cookie中保存sessionid（或者保存在URL中），以便于寻找到对应session状态；

* 数据库可以区分实体表和业务表进行思考；