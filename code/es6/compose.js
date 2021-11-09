/**
 * Compose 组合函数
 * 特点
 * 1. 后一个函数的返回值作为前一个函数的参数（只能有一个参数）
 * 2. 最后一个函数的参数可以无限多
*/

// reduce实现
// const compose = (...fns) => {
//     if (fns.length === 0) return arg => arg
//     if (fns.length === 1) return fns[0]

//     return fns.reduce((a, b) => {
//         // return function 接收最后的参数
//         console.log(a, b)
//         return (...arg) => {
//             console.log(a, b)
//             return a(b(...arg)) 
//         }
//     })

//     /**
//      * 拆解reduce --- a：累加器， b: 迭代item
//      * a(b())
//      * a(b(c(...arg)))
//      * 
//     */
// }


// 迭代法 - 比reduce好理解很多
const compose = (...fns) => {
    if (fns.length === 0) return arg => arg
    if (fns.length === 1) return fns[0]

    return (...arg) => {
        let params = fns[fns.length - 1](...arg)
        for (let i = fns.length - 2; i > -1; i--) {
            params = fns[i](params)
        }
        return params
    }
}


// 思考，若是一个函数有异步的怎么办，如何return? 感觉像是伪需求

function a (x) {
    return x * 1
}
function b (x) {
    setTimeout(() => {
        x *= 2
    }, 2000)
    return x
}
function c (x, y) {
    return x * y
}

console.log(compose(a, b, c)(9, 3))