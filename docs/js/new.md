# 实现new关键字

## new的作用过程简述
	1. 创建一个空对象
	2. 添加__proto__属性，和fn的原型绑定
	3. 将function的this指向所创建对象，执行function代码，给空对象添加属性
	4. 返回所创建对象


## new的特点
	1. 对于function有return值为基本类型或无return，new的返回值为内部所创建的Object
	2. return为object，new的返回值为function return的原始值


## 代码实现

~~~
function similarNew () {
	var obj = {}
	// 取出function
	var fn = [].shift.apply(arguments)

	// 添加__proto__属性，和fn的原型绑定
	obj.__proto__ = fn.prototype

	// 执行function, 并给obj赋予属性
	var ret = fn.apply(obj, arguments)
	return ret === 'object' ? ret : obj
} 
~~~