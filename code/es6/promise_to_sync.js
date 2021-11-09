// 将promise同步（按顺序）执行
function a () {
    return new Promise((resolve, reject) => {
        console.log(1)
        resolve(1)
    })
}
function b () {
    return new Promise((resolve, reject) => {
        console.log(2)
        resolve(2)
    })
}
function c () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3)
            resolve(3)    
        }, 2000)
    })
}
function d () {
    return new Promise((resolve, reject) => {
        console.log(4)
        resolve(4)
    })
}


const syncFun = (...fns) => {
    fns.reduce((a, b) => {
        return a.then(b)
    }, Promise.resolve())
}

syncFun(a, b, c, d)


// 如何通过同步实现此功能？
