// 实现compose
// 参数为fun, 从右往左开始执行，每个函数的执行结果为下一个的函数的参数
const f = (arg) => `函数f(${arg})` 

// function g
const g = (arg) => `函数g(${arg})`

// function h 最后一个函数可以接受多个参数
const h = (...arg) => `函数h(${arg.join('_')})`


const compose = (...arg) => {
    if (arg.length === 0) {
        return arg => arg
    }

    if (arg.length === 1) {
        return arg[0]
    }

    // 递归？
    return arg.reduce((a, b) => {
        return (...args) => {
            console.log(args)
            return a(b(...args))
        }
    })

    // return arg.reduce((a, b) => (...args) => a(b(...args)))
}

console.log(compose(f,g,h)('a', 'b', 'c'))

function a() {
    return new Promise((resolve) => {
        console.log('a')
        resolve()
    })
    
}
function b() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('b')
            resolve()
        }, 1000)
    })
    
}
function c() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('c')
            resolve()
        }, 1000)
    })
}

const arr = [a, b, c]

compose(a,b,c)()
