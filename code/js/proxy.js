// 代理
const proxyFun = (a) => {
    return new Proxy(a, {
        get (target, propKey, receiver) {
            // console.log(target, propKey, receiver)
            if (propKey === 'push') {
                return (...args) => {
                    // target.push(...args)
                    // target.push(222)
                    return []
                }    
            }
        }
    })
}

let proxys = proxyFun([1, 2, 3, 4])

// reflect可以拦截js的操作方法，并修改其值
const arr = new Array(10)
console.log(Reflect.set(proxys, 'push', Array.prototype.push))

proxys.push(1)
proxys.push(1)
console.error(proxys)


