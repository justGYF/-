# Promise的使用及实现

## Promise常用方法

### Promise.all

	1. 迭代promise全部resolve时执行then,
    2. 有个一reject,执行catch,参数为第一个reject的返回值
    3. 没有异常，也没有正常resolve, reject时，会pending

~~~
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject (1)
    }, 300)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 200)
})

Promise.all([p1, p2])
    .then((values) => { console.log('success', ...values) })
    .catch((error) => { console.log('error', error) })

// output: 
// error, 1
~~~


### Promise.allSettled

	无论成功与失败，等待所有的promise执行完成，返回一个promise的结果List

~~~
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject (1)
    }, 300)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 200)
})

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3)
    }, 300)
})

Promise.allSettled([p1, p2, p3, p4])
   .then((values) => { values.forEach(it => console.log(it.status)) })

// output：
// rejected
// fulfilled
// rejected
~~~


### Promise.race

	1. 一个待定的Promise, 采用第一个完成的Promise的值作为它的值（不论是resolve / rejecct）
    2. 若迭代值为空，则pending, 若同时有n个返回值，则取第一个

~~~
// 全部resolve -- 1,2的同时完成
Promise.race([Promise.resolve(1), Promise.resolve(2)])
	.then((value) => { console.log('success', value) })
	.catch((error) => { console.log('error', error) })

// output:
// success 1


// 存在reject -- 1,2的同时完成
Promise.race([Promise.reject(1), Promise.resolve(2)])
	.then((value) => { console.log('success', value) })
	.catch((error) => { console.log('error', error) })

// output:
// error 1


// p2先完成
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject (1)
    }, 300)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 200)
})
Promise.race([p1, p2])
	.then((value) => { console.log('success', value) })
	.catch((error) => { console.log('error', error) })

// output: 
// success 2
~~~


### Promise.any  (并未被多数浏览器支持,暂不介绍)


### Promise.prototype.finally

	1. 在Promise结束后执行finally, 不论是resolve, reject
	2. 不接受任何参数，不受 .then / catch 回调的影响

~~~
Promise.resolve(1)
    .then((res) => { setTimeout(() => console.log(res), 1000) })
    .catch((err) => { console.log(err) })
    .finally(() => { console.log('over') })

// output:
// over
--delay 1000ms
// 1

~~~


### Promise.prototype.then 与 Promise.prototype.catch

	.catch属于.then的内容抽离
	Promise.resolve(1)
		.then((success) => {}, (error) => {})
	then的第二个回调函数相当于  Promise.reject().catch(errpr => {})


## 模拟实现Promise