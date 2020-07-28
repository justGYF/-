# JS 实现 call, apply, bind

## call

### 作用简述：
1. 通过fn.call(obj, args)的调用方式，使fn可以访问和调用obj的属性和方法
2. 参数 obj 可选，在非严格模式下，值为 null / undefined ,自动指向全局对象，严格模式下，不传参数obj, 值为undefined
3. args为fn的参数列表
4. **重点在于function的执行，对于obj属性的访问和调用，而非function返回值, 返回值和fn的返回值保持一致即可**

### 代码实现

~~~
Function.prototype.newCall = function () {
    const obj = [...arguments].shift(0) || window
	
    // 防止覆盖原有属性
    const fn = Symbol();

    obj.fn = this
	
    // 展开参数并执行，返回值和fn的返回值保持一致
    const ret = obj.fn(...[...arguments].slice(1))

    delete obj.fn

    return ret
}
~~~
