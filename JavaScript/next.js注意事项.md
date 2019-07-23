1. `getInitialProps` 不能在子组件上使用，只能应用于当前页面的顶层组件；
2. `getInitialProps` 是一个静态方法（请仔细回忆什么是静态方法）通过function名可以直接调用的方法；

所以写法上是这样的：

```
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
```

或者这样的

```
const Page = ({ stars }) =>
  <div>
    Next stars: {stars}
  </div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

3. 使用`<Link>`组件主要用于路由跳转功能，其可以接收一个`必须`的子元素(DOM标签或者纯文字等)

    1. 如果添加的子元素是 DOM元素，则 Link会为此子元素赋予路由跳转功能；
    2. 如果添加的元素是纯文字，则 <Link>默认转化为 a标签，包裹在此文字外部(即作为文字的父元素)，如果当前组件有 jsx属性的 scope CSS，这个 a标签是不会受此 scope CSS影响的，也就是说，不会加上以 jsx开头的类名。
    需要注意的是，直接添加纯文字作为子元素的做法如今已经不被赞成了(deprecated)。

4. `getInitialProps`方法基本上只能在pages里面并且是顶层组件，不能是子组件；
5. 客户端在首次打开页面时（或刷新页面）服务端已经提供了完整的HTML文档可以立即显示。此时React的组件依然执行一次虚拟Dom渲染，所以所有的组件都会执行。然后_Nextjs_利用类似于_React_服务端渲染的_checksum_的机制防止虚拟Dom对真实Dom进行渲染，关于_React_服务端渲染的_checksum_机制可以到React [前后端同构防止重复渲染](https://www.chkui.com/article/react/react_server_render_with_checksum)一文了解。  
(总结：页面第一次加载时虽然render会在客户端再次执行一次，但是通过checksum机制，并不会对真实dom进行渲染)

[参考](https://cloud.tencent.com/developer/article/1401559)