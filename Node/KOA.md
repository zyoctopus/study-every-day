* new Koa()就是一个应用程序；
* 通过use方法注册中间件，例如：use(func)；
* 多个中间件通过next();顺序调用，不然只会调用注册的第一个；
* 中间件函数要使用async定义，next函数要使用await调用；因为需要所有中间件都是严格按照`洋葱模型`进行执行的；
* await可以用`求值`关键字来理解，对于promise而言不再是返回一个promise，而是直接返回promise的值；