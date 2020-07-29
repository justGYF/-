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
    
    obj[fn] = this

	// 展开参数并执行，返回值和fn的返回值保持一致
    const ret = obj[fn](...[...arguments].slice(1))

    delete obj[fn]

    return ret
}
~~~


## apply

### 参数 apply(obj, args)

### 作用简述：
1. apply 与 call 的实现功能一致，在传参上有一点差异。
2. 参数obj必传，若是不传，this指向window, 但是若有 arr.push.apply()这种调用方式，没有传参，会报错，此模拟实现没有达到这种报错处理效果
3. args 为参数列表，是一个数组，但是在内置的处理中，**数组的每个元素又是单独的参数**，所以obj[fn]执行时和call的参数形式一致。

### 代码实现

~~~
Function.prototype.newApply = function () {
    const obj = arguments[0] || window

    const handler = Symbol();

    obj[handler] = this

    let ret;
	
	// 判断args是否为数组 --- 是否要采用 Object.prototype.toString.call(arguments[1]) === '[object Array]' 这种方式？
    if (typeof arguments[1] === 'object') {
        ret = obj[handler](...arguments[1])
    } else {
        ret = obj[handler]()
    }

    delete obj[handler]

    return ret
}
~~~


## bind

### 与call, apply的主要区别
bind 的返回值和call, aplly不同，bind返回的是原函数的拷贝，并拥有指定的this和初始化的参数。

### 调用方式
~~~
// fnC为fn的函数拷贝，并且已经预存参数arg1, arg2.., this指向obj
const fnC = fn.bind(obj, arg1, arg2...)

// 调用fnC, 新传arg3, arg4的参数会续在arg1, arg2后
fnC(arg3, arg4...)  相当于  fn(arg1, arg2, arg3, arg4...)

~~~

### 代码实现

~~~
Function.prototype.newBind = function () {
    const obj = arguments[0] || window
    const context = this
    // 获取剩余参数
    const args = [...arguments].slice(1)

	// 非函数调用抛出异常
    if (typeof context !== 'function') {
        throw new TypeError('Function.prototype.bind - ' +
            'what is trying to be bound is not callable');
    }

    return function () {
        const newArgs = args.concat([...arguments])
        return context.apply(obj, newArgs)
    }
}


~~~


## 参考资料

[MDN_call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

[MDN_apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

[MDN_bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)