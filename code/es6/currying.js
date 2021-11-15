// 函数柯里化  currying(func)
// 创建一个函数，当此函数接收的参数和func所以参数一致时，返回func的执行结果，否则返回一个函数，可以继续接受剩余的参数

// 返回值必须是函数或者执行结果
const currying = (func, ...args) => {
    const funArgLength = func.length
    let allArgs = [...args]
    if (allArgs.length === funArgLength) {
        return func(...args)
    }
    const res = (...args1) => {
        allArgs = [...allArgs, ...args1]
        if (allArgs.length === funArgLength) {
            return func(...allArgs)
        } else {
            return res
        }
    }
    return res
}


const s = (a, b, c) => a + b + c
let a = currying(s, 1, 2, 4)
console.log(a)

/**
 *  实现函数
 *  go() --- good
 *  go()() --- goood
 */

// const aa = (fun) => {
//     let str = 'goo'
//     const res = (arg) => {
//         if (arg) {
//             return str + arg
//         } else {
//             str += 'o'
//             return res
//         }
//     }
//     return res
// }
// let go = aa()
// console.log(go()('d'))