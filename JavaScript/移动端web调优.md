# 移动端web调优

移动端web调优的目标和挑战

移动端互联网进入到存量竞争的时代

核心竞争力：用户体验

带来的就是产品体验优化

目标：

曾经：省时，省电，省流量

现在：省时，省电，省流量？

***

### 省电：
3态通信有研究表明，大部分电量用来建立网络连接（46%电量仅传输了0.2%的数据）

#### 对策：
减少频繁的数据交互
资源缓存，预获取
移除不关键的动画
避免dom操作
借助page visibility，对非激活态的页面，暂停其行为

***

基本原理

测速方法

Performance Timing
Navigation Timing
Resource Timing

多普勒测速 
t1=DNS+New Connection+RTT
t2=New Connection+RTT

t1 - t2 为DNS请求速度

这个就是测速的原理，跟Navigation Timing提供的方式一样

优化方式：

DNS预获取：浏览器预先在后台解析，当使用的时候解析时间就为0
减少域名：多个域名，同样会增加DNS解析时间
keep-alive提升

### 调试工具与方法：
google pagespeed
pc上模拟移动浏览器
performance面板
whistle反向代理
vconsole
android 打开 chrome://inspect 
iOS 利用 safari 


## 优化方法

### 流量优化
减少连接次数
减少数据量
延时加载

### 性能优化
css3动画性能
渲染性能

### 体验优化
tap事件
响应式设计

### 流量优化基本方法
合并JS、css文件
减少JS和CSS内嵌
减少页面交互、切换
GZIP
css3替代图片，圆角、渐变、简单图形
SVG
webp

http2的话，可以忽略部分优化

http2，多路复用，压缩request header，服务端推送

### 流量优化进阶
小图用base64
font icon
cdn请求
localstorage缓存js，css
ssr，服务端渲染
离线包

### 性能优化
no iframe
减少dom元素
扁平化设计，减少阴影渐变
使用css3动画，translate3D开启GPU加速
减少重排重绘

渲染时间优化目标，小于 16.6ms（60帧）
不要在16ms之内重复渲染
requestAnimationFrame代替setTimeout/setInterval
devtools 提供的 timeline 工具

transform:translateZ(0) 开启GPU加速

### 数据缓存设计
目标：
提升首屏，减少白屏
功能：
高度可配置
通知机制
默认数据配置
重要数据标记
过期清除算法

skeleton screen（骨架屏）
