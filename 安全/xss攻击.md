### 什么是XSS攻击

跨站脚本攻击（Cross-Site Scripting)，是一种**代码注入**攻击。

> 代码注入：攻击者通过在目标网站中注入恶意脚本，使其在用户浏览器中运行，从而获取用户敏感信息如Cookie，SessionId等，进而危害数据安全；

### 如何注入恶意代码
1. 在html内嵌的文本中，内容以script标签形式注入；
2. 内联的JavaScript中，拼接的数据突破了原有的限制（字符串，变量，方法名等）；
3. 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签；
4. 在标签的 href、src 等属性中，包含 javascript: 等可执行代码；
5. 在 onload、onerror、onclick 等事件中，注入不受控制代码；

#### XSS的本质

恶意代码未经过滤，与正常代码混在一起，浏览器无法辨认，从而导致恶意代码被执行。

### XSS的分类

1. 存储型：
    * 注入的恶意代码会被提交到后端写入数据库；
    * 用户在请求数据的时候将恶意代码从数据库取出来拼接到HTML中，浏览器解析后恶意代码执行；
    * 恶意代码窃取用户数据并返回给攻击者网站，攻击者冒充用户调用目标网站接口，执行攻击者指定操作；

    > 攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

2. 反射型：
    * 攻击者构造特殊的URL，后面拼接有恶意参数；
    * 用户点击这个URL，**服务端**将恶意代码从URL中取出来拼接到html中返回给浏览器；
    * 浏览器解析恶意代码并执行；
    * 恶意代码窃取用户数据并返回给攻击者网站，攻击者冒充用户调用目标网站接口，执行攻击者指定操作；

    > 反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

以上两种都是服务端安全漏洞，主要由服务器导致；

3. DOM型
    * 攻击者构造特殊的URL，包含恶意代码；
    * 用户打开恶意代码的URL，浏览器接收后解析执行，JavaScript去除URL中的恶意代码并执行；
    * 恶意代码窃取用户数据并返回给攻击者网站，攻击者冒充用户调用目标网站接口，执行攻击者指定操作；

    > 该攻击是浏览器完成，属于JavaScript的安全漏洞；

### 如何预防

1. 攻击者提交恶意代码：
    * 前端进行过滤并不全面，因为很容易绕过前端，直接构造请求；

    对于存储型和反射型：
    * 改成纯前端渲染，把代码和数据分割开；
        > 纯前端渲染的话，我们会明确告诉浏览器对应数据属于文本，属性，还是样式，浏览器不容易被欺骗；
    * 对html做充分转义；
        > 如果拼接html是必要那就需要做充分的转义，不同的上下文需要不同的转义规则；
        ```
        <!-- HTML 标签内文字内容 -->
        <div><%= Encode.forHtml(UNTRUSTED) %></div>

        <!-- HTML 标签属性值 -->
        <input value="<%= Encode.forHtml(UNTRUSTED) %>" />

        <!-- CSS 属性值 -->
        <div style="width:<= Encode.forCssString(UNTRUSTED) %>">

        <!-- CSS URL -->
        <div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">

        <!-- JavaScript 内联代码块 -->
        <script>
        var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
        alert(msg);
        </script>

        <!-- JavaScript 内联代码块内嵌 JSON -->
        <script>
        var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
        </script>

        <!-- HTML 标签内联监听器 -->
        <button
        onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
        click me
        </button>

        <!-- URL 参数 -->
        <a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">

        <!-- URL 路径 -->
        <a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">

        <!--
        URL.
        注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
        -->
        <a href='<%=
        urlValidator.isValid(UNTRUSTED) ?
            Encode.forHtml(UNTRUSTED) :
            "/404"
        %>'>
        link
        </a>
        ```
2. 浏览器执行恶意代码：
    * DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
    > 在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。
3. 限制输入内容长度也可以有效增加XSS的攻击难度；