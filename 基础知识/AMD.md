#### 什么是AMD

异步模块定义（Asynchromous Module Definition）：一个浏览器端模块化开发的规范，用于浏览器环境并且允许非同步加载模块，同时又能保证正确的顺序，也可以按需动态加载模块；

#### 特点

1. 异步加载模块，模块加载不影响后面语句的运行。所有依赖某些模块的语句均放置在回调函数中。
2. 只定义了一个函数 define，通过 define 方法定义模块。define的描述如下：
    > define(id?, dependencies?, factory) 
    > * id：指定义中模块的名字（可选）。如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
    > * dependencies：当前模块依赖的，已被模块定义的模块标识的数组字面量（可选）。
    > * factory：一个需要进行实例化的函数或者一个对象。
3. AMD 规范允许输出模块兼容 CommonJS 规范；


#### 可以通过return暴露属性和方法

```
define(['jquery'],function($){
    //变量定义区
    var moduleName = "hello module";
    var moduleVersion = "1.0";
 
    //函数定义区
    var showMessage = function(name){
        if(undefined === name){
            return;
        }else{
            $('#messageBox').html('欢迎访问 ' + name);
        }
    };
 
    //暴露(返回)本模块API
    return {
        "moduleName":moduleName,
        "version": moduleVersion,
        "showMessage": showMessage
    }
});
```

### 通过require.config修改默认配置

```
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.1'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'modal':{//模态框插件不是模块化
            deps:['jquery'],
            export:"modal"
        },
    },
    map: {
        'script/newmodule': {
            'foo': 'foo1.2'
        },
        'script/oldmodule': {
            'foo': 'foo1.0'
        }
    },
    config: {
        'script/bar': {
            size: 'large'
        },
        'script/baz': {
            color: 'blue'
        }
    }
});
```