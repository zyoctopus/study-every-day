* componentWillReceiveProps生命周期函数在改变props的时候会触发，在当前component进行setState并不会触发，所以在componentWillReceiveProps中可以放心setState而不必担心造成死循环；
* 初始化render时不会执行；

但是：

* props没有改变也可能会触发componentWillReceiveProps生命周期函数执行，也就是说该生命周期函数执行了但是不意味着props发生了改变；
* 原因是：react不希望用过多的性能去进行深层次的判断，只要组件重新被render了（父级render执行），那componentWillReceiveProps就会被执行，即使所有的props数据都未发生变化（可能引用发生了改变）；