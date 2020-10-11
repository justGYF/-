// 利用闭包实现只执行一次的函数
const once = (func) => {
    let called = false

    return function() {
        if (!called) {
            called = true
            func.apply(this, arguments)
        }
    }
}


let i = 0
function a () {
    console.log(++i)
}
const fun = once(a)
fun()
fun()
fun()