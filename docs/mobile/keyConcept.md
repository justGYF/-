# 简单的概念

## 移动端开发
所开发产品可以运行于移动设备（手机，平板等）

## 响应式
通过一定的方式，使产品在各分辨率，各类别的设备上正常运行展示

```
### viewport 视觉窗口

移动设备的浏览器viewport默认为大多为980px


移动设备：屏幕尺寸不变，物理像素变大，当不设置viewport时，就按css设置的像素进行显示，导致移动端元素显示过小。
DPR: window.devicePixelRatio = 设备物理像素 /  独立像素（视觉像素大小 -- 屏幕直观尺寸大小）
当设置了width=device-width，元素的宽度(物理像素) = css设置宽度 * DPR; 即元素的视觉大小不变，不会因为变小而不清晰


layout viewport(默认模式)： document.documentElement.clientWidth  （通常大于浏览器可视区域）
visual viewport: window.innerWidth (浏览器可视区域)
ideal viewport: 移动设备的理想viewport。

#### 通过meta设置viewport
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

name="viewport"  声明设置viewport相关配置
content="..."   设置具体内容
width=device-width: 将layout viewport的宽度设为移动设备的屏幕宽度，即 ideal viewport
initial-scale: 基于ideal viewport进行缩放，所以也可以达到ideal viewport的效果。

content：
width	设置layout viewport 的宽度，为一个正整数，或字符串”width-device”
initial-scale	设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale	允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale	允许用户的最大缩放值，为一个数字，可以带小数
height	设置layout viewport 的高度，这个属性对我们并不重要，很少使用
user-scalable	是否允许用户进行缩放，值为”no”或”yes”, no 代表不允许，yes代表允许

```
## 响应式布局
~~~
### 媒体查询

内嵌式：
@media screen and (max-width: 960px) and (min-width: 700px) {
    /* css样式 */
}

外链式：xxx.css为样式表，media="控制条件"
<link href="../../xxx.css' media="screen a  nd (max-width: 960px) and (min-width: 700px)" rel="stylesheet" type="text/css"></link>
~~~

## rem
rem相对于html根节点
em相对于元素盒子设置的font-size，每个div都可以设置不同的font-size
```
html {
    font-size: 20px; // 1rem = 20px
}

div {
     font-size: 12px; // 1em = 12px
}


iphone 6/7/8: (设置viewport的width后)
window.innerWidth = 375
常用 1rem = 50px

所以当 设备切换或者触发onresize, 宽度变化时, 监听事件， 动态改变根节点的font-size：
html的font-size = (window.innerWidth / 375 * 100) + 'px'
```

## less简单用法
1. 声明变量
```
@color: #222;
h2{
    color: @color;
}
```
2. Minxins
```
// b直接使用a的样式
@color: #222;
.a {
    color: @color;
}
.b {
    .a;
}
```
3. 嵌套
4. 运算
```
@a: 10px;
@b: 20px;
@sum = @a + @b;
.active{
    width: @sum;
}
```
5. 插值
```
@className: a;
.@{className} {
    ....
}
```
6. 自定义函数
```
@base: 375 / 375 * 0.01
// 自定义函数
.pxtorem (@className, @px) {
    @{className}: @px * @base * 1rem
} 
使用自定义函数
.a {
    font-size: 20px;
    .pxtorem(b, 30px)
}
```
7. 逃离 -- ‘~’后的字符串会直接使用
```
@str: ~"(min-width: 768px)"
body {
    @media @str {
        background: red
    }
}

等于

@media (min-width: 768px) {
    body {
        background: red
    }
}

```




## APP
原生ios, android, ReactNative

## H5
使用html5的新特性，运行在浏览器或移动端浏览器或app内置浏览器中，移动端几乎都使用webkit内核的浏览器
可以降低对兼容性的额关注度