#### dva（或redux）

* 函数式的；
* 单向数据更新，理想状态是immutable，最好每次都是返回一个新的数据（新的引用），支持数据回溯；
* 一个封装了redux的状态管理，封装了redux、redux-saga和react-router；
* 状态管理上比redux方便，不需要actions、constants、reducers等目录间切换，只需要在modal完成就可以了；
* 建议全局唯一store；

#### mobx

* 面向对象的；
* 数据始终是同一份（引用未发生变化）；
* 比dva灵活，store可以绑定到某一模块，多store；
* 并没有全局唯一store；

总结：redux实现的对数据的管理是pull方式，等待应用派发某个行为（action），然后重新出发UI渲染，做不到对行为的可预期；Mobx是基于push，监听数据的属性变化来实现的，而且是多store的，对数据的变更第一时间知道，可以做到对数据的可预测以及细粒度的控制；
