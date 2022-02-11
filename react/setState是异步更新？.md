# setState 不是异步更新，也不是宏任务 or 微任务

> 先说结论：setState 是同步代码实现的，只是行为看起来像异步。（React15及之前，会在微任务之前更新）

原因：由于 React 的更新机制，在 React 生命周期以及绑定的事件流中，在当前事件循环里，所有的 setState 操作会线缓存到一个队列中，在当前整个事件结束或者 mount 流程结束后，将当前缓存的整个 setState 队列进行一次更新，相当于理解为 setState 其实不是更新操作，而且添加需要更新的内容，更新的时机不在当下；

### 可以将 setState 变成同步立刻更新吗？

答案：可以。
原理：只要跳出 React 的事件流或者生命周期，就能打破 React 对 setState 的掌控。
做法：最简单的就是把 setState 放到 setTimeout 的匿名函数中。
例如：

```
handleClick = () => {
  setTimeout(() => {
    console.log('触发点击')
    this.setState({
      test: 'test',
    }, () => {
      console.log('更新成功')
    })
    console.log('点击结束')
  })
}

// 输出顺序：触发点击->更新成功->点击结束

```

可以看到，setState 本质上还是在一个事件循环里，并没有切到宏任务或者微任务；
