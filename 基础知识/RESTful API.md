#### 什么是RESTful API

REpresentational State Transfer，英语的直译就是“表现层状态转移”；  
用URL定位资源，用HTTP动词（GET,POST,PUT,DELETE)描述操作的一种风格的API。  
* Resource：资源，即数据；
* Representational： 某种表现形式，比如用JOSN，XML，JPEG等；
* State Transfer：状态变化。通过HTTP动词实现；

#### RESTful API的作用
用户请求统一由一个后台来处理返回给不同前端（手机、平板和PC等），RESTful API就是一套协议来规范多种形式的前端和同一个后台的交互方式。

#### RESTful API的原则和规范
首先RESTful是典型的HTTP的请求协议，由后台也就是SERVER来提供前端来调用。前端调用API向后台发起HTTP请求，后台响应请求将处理结果反馈给前端。

1. 资源，资源是实体，一段文本，一张图片或者一首歌曲。资源总是要通过一种载体来反应它的内容。文本可以用TXT，也可以用HTML或者XML、图片可以用JPG格式或者PNG格式，JSON是现在最常用的资源表现形式。
2. 统一接口，RESTful风格的数据元操CRUD（create,read,update,delete）分别对应HTTP方法：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源，这样就统一了数据操作的接口。
3. URI，每一个URI都对应一个特定的资源。要获取这个资源访问对应的URI就可以了，因此URI就成了每个资源的地址或者标识符。一般的，每个资源至少有一个URI相对应，最典型的就是URL；
4. 无状态，也就是没有前置条件，不依赖于其它资源或者状态，只要请求对应的URI就能得到资源；
5. URL中只能有名词，不能有动词，操作的表达是使用HTTP的动词GET,POST,PUT,DELETEL；  
……

[参考](https://blog.csdn.net/hjc1984117/article/details/77334616)