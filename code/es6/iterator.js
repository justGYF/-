// Iterator 遍历器  统一的接口机制，处理所有不同的数据结构
// 任何数据结构只要部署Iterator接口，就可以完成遍历操作
// es6 默认一个数据结构只要具备Symbol.iterator属性，就认为是可以迭代的

/**
 * Iterator 的作用
 * 1. 为各种数据结构提供统一的访问接口
 * 2. 使数据结构的成员可以按某种顺序排列
 * 3. 可以使用 for...of..
 * 
 * 默认具备 Symbol.iterator属性的数据结构
 * 1. Array
 * 2. Map
 * 3. Set
 * 4. String
 * 5. TypedArray
 * 6. 函数的arguments对象
 * 7. NodeList对象
*/

// Array.prototype[Symbol.iterator] = () => {

// }


// 为原生的Object添加 Iterator
let obj = {
    a: 1111,
    b: 2222,
    [Symbol.iterator] () {
        let arr = Object.keys(this).map(it => this[it])
        let len = arr.length
        let start = 0
        return {
            next() {
                if (start >= len) {
                    return {value: undefined, done: true}
                } else {
                    return {value: arr[start++], done: false}
                }
            }
        }
    }
}
// for (let a of obj) {
//     console.log(a)
// }

// Generator 函数是 ES6 提供的一种异步编程解决方案
function* aa() {
    yield new Promise((resolve) => {
        console.log('1')
        setTimeout(() => {
            resolve('3')
        }, 1000)
    })
    yield console.log('2')
}
var s = aa()
var a = s.next()
a.value.then((res) => {
    console.log(res)

})
s.next()