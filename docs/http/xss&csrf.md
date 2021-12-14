# XSS: 跨站点脚本攻击
网站对输入输出校验不严格导致恶意脚本攻击

**反射型xss**
通过将恶意代码拼接在url后的形式，完成攻击

 
**存储型xss**
用户恶意输入的内容，被保存到数据库中，导致所有访问此数据的用户被攻击，例如博客，评论等。

 
**dom型xss**
特殊的反射型xss, 基于dom文档对象模型
网站针对dom进行脚本操作，并且值和url相关，恶意代码拼接在url后，然后被注入到dom操作中，得以执行。

常见的可以操纵dom的对象：URL，localtion,referrer等

**防范手段**
做完整的输入输出校验，前后端都需要做，例如对`<script></script>`的转化`&lt;script src=1.js&gt;&lt;/script&gt;`



 将脚本转化为十六进制可能绕过字符校验



# CSRF: 跨站点请求伪造攻击

**场景**: 用户登陆站点A，并在新的标签页打开恶意网站C, C在网页中发起对站点A发起请求，浏览器会自动带着A的cookie， 以此，C完成攻击

**攻击前提**：用户登陆A, 并访问C


**防范手段**
1. 验证referer, origin, UA 检测请求发起者是否为客户端，域名是否为A站点
2. **自定义请求头csrfToken**，每次请求添加此请求头，值从cookie中截取，具体规则前后端协商。C站访问A接口不会自动携带此请求头。
3. **不同域的cookie不共享**，C不可以直接读取A的cookie,所以约定的token值可以放在cookie中，这样即使C知道A的token规则，也无法拿到具体的值
4. **要读取cookie，就不可以设置http-only**, 与xss防范冲突，需要具体场景具体分析


### JWT： Json Web Token
1. 客户端存储的身份验证信息
2. 登录成功后，后端返回加密信息(message)，前端在之后的每次请求在请求头添加此信息，常用做法
   
```
    Authorization: bearer message 
```
3. jwt = Header + Payload + signature

