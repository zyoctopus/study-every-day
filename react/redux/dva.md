# 状态管理

## redux

- 属于同步更新
- 相关 api
  1. store：就是一个数据池，一个应用只有一个；
  2. state：一个 State 对应一个 View。只要 State 相同，View 就相同。
  3. action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的 type 属性是必须的，表示 Action 的名称。其他属性可以自由设置。
  4. dispatch：它是 view 发出 action 的唯一方法；
  5. reducer：view 发出 action 后，state 要发生变化，reducer 就是改变 state 的处理层，它接收 action 和 state，通过处理 action 来返回新的 state；
  6. subscribe：监听。监听 state，state 变化 view 随之改变；

## react-redux

- react 在 redux 进行的封装，让 redux 更加适用与 react，更新 state 的过程依然是同步的，但是因为用到了 setState 更新视图，所以更新视图是异步的；
- 增加的 api：
  1. connect：通过高阶函数，利用 useContent 的方式将 state 绑定到对应的 component 上，并且有以下两个参数；
  2. mapStateToProps：一个函数， 建立一个从（外部的）state 对象到（UI 组件的）props 对象的映射关系。 它返回了一个拥有键值对的对象；
  3. mapDispatchToProps：用来建立 UI 组件的参数到 store.dispatch 方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。

## dva

- dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后 dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。dva = React-Router + Redux + Redux-saga；
- 核心概念：
  1. State：一个对象，保存整个应用状态；
  2. View：React 组件构成的视图层；
  3. Action：一个对象，描述事件
  4. connect 方法：一个函数，绑定 State 到 View
  5. dispatch 方法：一个函数，发送 Action 到 State
- 提供的 model：
  1. namespace：model 的命名空间；整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成；
  2. state：该命名空间下的数据池；
  3. effects：副作用处理函数，得用异步来写；
  4. reducers：等同于 redux 里的 reducer，接收 action，同步更新 state；
  5. subscriptions：订阅信息；
