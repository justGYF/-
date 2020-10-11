// 数据劫持,将data的数据全部劫持到vm(vue实例中)
// this.key 取代 this.data.key

// const data = {
//     a: 1,
//     b: 2
// }

// const vm = {
//     c: 3
// }

// const sharePropertyDefinition = {
//     // 可枚举
//     enumerable: true,
//     // 可配置
//     configurable: true
// }

// Object.keys(data).forEach(key => {
//     sharePropertyDefinition.get = function proxyGetter () {
//         return data[key]
//     }
//     sharePropertyDefinition.set = function proxyGetter (val) {
//        data[key] = val
//     }
//    Object.defineProperty(vm, key, sharePropertyDefinition) 
// })

// console.log(vm.a)




// 在node中操作文件,修改其中变量
// node --- .load xxx.js --- 随便访问变量,修改变量


// Dep 依赖收集, watch 保存响应

// 需要监听的数据
let data = {
    price: 5,
    quantity: 2
}
let total, salePrice

// 
function defineReactive (data) {
    Object.keys(data).forEach(key => {
        let dep = new Dep()
        let initValue = data[key]
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get () {
                dep.depend()
                return initValue
            },
            set (val) {
                initValue = val
                dep.notify()
            }
        })
    })
}


// 收集依赖 - get
class Dep {
    constructor () {
        this.subs = []
    }

    depend () {
        if (Dep.target && !this.subs.includes(Dep.target)) {
            this.subs.push(Dep.target)
        }
    }   

    notify (){
        this.subs.forEach(sub => sub())
    }
}

// 劫持初始化
defineReactive(data)

// 需要执行的响应 - 使用Dep.target保存
function watcher (myFunc) {
    Dep.target = myFunc
    // 执行func, 触发get, target有值, dep.depend成功执行
    Dep.target()
    // target置为null
    Dep.target = null
}

watcher(() => {
    // 在此触发get
    total = data.price * data.quantity
})

watcher(() => {
    salePrice = data.price * 0.9
})

// 总结: data -> defineProperty(get -> dep.depend(订阅); set -> dep.notify(发布)) -> watcher(绑定回调依赖)
// 先初始化defineProperty, 执行watcher, 触发defineProperty中的dep, Dep.target = watch回调, 收集完, Dep.target = null
// 保证Dep.target值不冲突