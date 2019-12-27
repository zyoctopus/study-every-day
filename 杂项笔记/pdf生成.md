#### 对于几个库的调研

1. [jsPDF](https://github.com/MrRio/jsPDF)

    * 设置方式简单明了；
    * 可设置各种图形，字体，线条等；
    * 可设置表格，没看到可以设置复杂表格；
    * 文档也太难用了；

    结论：在表格方面无法满足要求

2. [pdfmake](https://github.com/bpampuch/pdfmake)

    * 布局丰富，定位，列布局，margin；
    * 插入图片，设置背景；
    * 简单列表，复杂表格都有；
    * 文字样式；

    结论：基本满足所有要求

3. [pdfkit](https://github.com/foliojs/pdfkit)

    * 可以绘制各种丰富的图案；
    * 没有表格；

    结论：无法满足要求

4. [react-pdf](https://github.com/diegomura/react-pdf)

    * 没有表格；

    结论：无法满足

5. [ReLaXed](https://github.com/RelaxedJS/ReLaXed)

    * 使用Pug语言；
    * 样式设置自由；
    * 学习成本有点高；

    结论：需求可以满足，可是引入新的语言，学习成本大

#### 方案选择

1. 直接做出一个新的打印预览页面，支持chrome的打印导出pdf；

优点：简单，可以嵌入测评结果；而且表格每个截断的页面头部都会有表格头部；

缺点：一定要有预览页面，没有相关pdf跳页面目录；

2. html2canvas + jsPDF

实现方式：把html内容转为canvas，然后生成图片，把图片添加到jspdf里，保存导出pdf；

优点：生成的pdf清晰度好，支持中文字体，可嵌入测评结果页面；

缺点：生成的pdf内容大小不可控与模板样式有关，并且html模板必须要展示,display:none或者visibility:hidden, 甚至设置定位，top:-1000%，也不行，会打印出空白的；表格被截断部分不会有表格头部；

3. jsPDF的html生成pdf

实现方式：jsPDF有直接提供html生成PDF的方法，也是对生成的html进行截图生成图片

优点：代码简单，且支持中文字体，支持嵌入测评结果；

缺点：同样html模板必须要展示,display:none或者visibility:hidden, 甚至设置定位，top:-1000%，也不行，会打印出空白的（或者整块黑色的）；清晰度一般，不是很高，要求不高的可以使用这个方法；

4. jsPDF-CustomFonts-support + jsPDF

实现方法：直接使用jsPDF的相关api构建页面，同时用插件支持中文；

优点：生成的pdf清晰度高，不需要html模板，不需要显示在浏览器内，可静默导出；

缺点：需要自己生成字体文件，而且复杂表格不好处理，嵌入测评结果麻烦；需要结合addHTML的api，测评结果一定要展示；

5. html2canvas(或者html-to-pdfmake) + pdfmake

[通过JS将HTML导出为PDF文档](https://juejin.im/post/5bd68d86e51d457a537122f4)

[js生成PDF的几种方法](https://juejin.im/post/5d25d918518825424d656f35)

[前端实现html转pdf方法总结](https://segmentfault.com/a/1190000016324962)

[将HTML页面转换为PDF文件并导出](https://segmentfault.com/a/1190000013440042)