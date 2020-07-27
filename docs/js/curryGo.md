# 柯里化实现go函数

## go函数功能：

	传空值时显示o, 传字符串显示字符串，其余类型的参数暂不考虑，调用次数不限，自动拼接字符
	go()			--- goo
	go()()('p')		--- gooop

## 函数实现

~~~
const go = function () {
    const arr = []
    // 箭头函数没有自己的arguments，故使用function
    arguments.length > 0 ? arr.push(...arguments) : arr.push('o')

    const joinStr = function () {
        arguments.length > 0 ? arr.push(...arguments) : arr.push('o')
        return joinStr
    }

	// 改写内置方法，函数调用结束，此方法自动调用
    joinStr.toString = () => {
        return arr.reduce((a, b) => {
            return a + b
        }, 'go')
    }

    return joinStr
}

~~~

## 简述思路

1. 在每次接收参数时并不进行计算，等到所有调用结束进行一次性的计算，此为**柯里化**。

2. 第一次调用即为初始化，也是对内部递归函数的生成。定义参数收集变量 arr, 使用闭包保持对其的引用。

3. 在多次调用中，其本质就是对 joinStr 方法的递归调用，每次调用都修改 arr 的值，等待调用结束，**返回值为function时**，会自动调用被修改的内置方法toString,  输出结果。

4. 无法确定何时调用结束，所以改写toString，也可以在toString中使用console打印结果。如果您有更好的确定结束方法，请提issues


## 参考博客
[https://www.jianshu.com/p/2975c25e4d71](https://www.jianshu.com/p/2975c25e4d71)