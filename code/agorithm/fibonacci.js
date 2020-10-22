/**
 * 实现一个斐波那契方法
 * 要求，带有缓存效果，已计算过的值不再被计算
*/

function fun () {
    let obj = {}
    let fib = function () {
        let n = arguments[0] || 0
        if (n === 0) return 0
        if (n === 1) return 1
        if (obj[n] !== undefined) {
            console.log('存在值，直接取，不再对此值进行递归')
            return obj[n]
        }
        if (n > 1) {
            return fib(n - 1) + fib(n - 2)
        }
    }
    let fibonacci = function () {
        let n = arguments[0] || 0
        if (obj[n] !== undefined) {
            console.log('存在值，直接取，不再对此值进行fibonacci计算')
            return obj[n]
        } else {
            obj[n] = fib(n)
        }
        return obj[n]
    }
    return fibonacci
}

const fibonacci = fun()
fibonacci(6)
fibonacci(7)
fibonacci(8)