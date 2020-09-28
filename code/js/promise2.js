// 实现Promise

const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const PENDING = 'pending'

class NewPromise {
    // new Promise时的回调handle
    constructor (handle) {
        // 数据初始化
        this.value = ''
        this.status = PENDING

        // 定义回调收集
        this.resolveArr = []
        this.rejectedArr = []

        // 直接执行handle
        handle(this._resolve.bind(this), this._reject.bind(this))
    }

    static resolve (val) {
        if (val instanceof NewPromise)
            return val
        return new NewPromise(resolve => resolve(val))
    }

    static rejected (val) {
        if (val instanceof NewPromise)
            return val
        return new NewPromise(rejected => rejected(val))
    }

    _resolve (val) {
        if (this.status !== PENDING) {
            return
        }
        const run = () => {
            this.status = FULFILLED
            this.value = val
            let cb
            while(cb = this.resolveArr.shift()) {
                cb && cb(val)
            }
        }
        setTimeout(() => {
            run()
        }, 0)
    }

    _reject (err) {
        if (this.status !== PENDING) {
            return
        }
        const run = () => {
            this.status = REJECTED
            this.value = err
            let cb
            while(cb = this.rejectedArr.shift()) {
                cb && cb(err)
            }
        }
        setTimeout(() => {
            run()
        }, 0)
    }

    // onResolve, onRjected为 then的回调函数, 开发者写的
    then (onResolve, onRejected) {
        // 获取resolve或者rejected后的status, value
        const { status, value } = this
        // (onResolveNext, onRejectedNext) => {} 为返回默认promise类型的handle
        return new NewPromise((onResolveNext, onRejectedNext) => {
            
            let fulfilled = value => {
                // console.log('ss')
                try {
                    // 先执行then的回调获取结果
                    const result = onResolve(value)
                    // 如果回调函数返回的是promise,return的promise值就是这个promise的值
                    if (result instanceof NewPromise) {
                        // result.then(
                        //     value => onRejectedNext(value),
                        //     reson => onRejectedNext(reson)
                        // )
                        // 等同于 result.then(onResolveNext, onRejectedNext)
                        result.then(onResolveNext, onRejectedNext)
                    } else {
                        // 如果回调函数返回的不是promise,return的promise就会成功,result就是返回值
                        onResolveNext(result)
                    }

                } catch(reson) {
                    //  如果抛出异常,return的promise就会失败,reason就是error
                    onRejectedNext(reson)
                }    
            }

            let reject = err => {
                try {
                    const result = onRejected(err)
                    if (result instanceof NewPromise) {
                        result.then(onResolveNext, onRejectedNext)
                    } else {
                        onResolveNext(result)
                    }
                } catch(reson) {
                    onRejectedNext(reson)
                }
            }

            // status为上一个promise的状态, 上一改变,下一个才能执行,
            // 在_resolve中,执行resolveArr中的fulfilled, 会引起返回值promise的resolve的执行,从而触发
            // .then回调的执行
            if (status === PENDING) {
                console.log('sssss')
                this.resolveArr.push(fulfilled)
                this.rejectedArr.push(reject)
            } else if (status === REJECTED) {
                reject(value)
            } else {
                fulfilled(value)
            }
            // switch (status) {
            //     case PENDING:
            //         // 如果status为pending, 就push,直到status改变
            //         this.resolveArr.push(fulfilled)
            //         this.rejectedArr.push(reject)
            //         break;
            //     case REJECTED:
            //         reject(value)
            //         break;
            //     case FULFILLED:
            //         fulfilled(value)
            //         break;
            //     default: break;
            // }
        })
    }
}



NewPromise.resolve(2)
    .then((val) => {
        // console.log(val)
        return 1
    })
    // .then((res) => {
    //     return new NewPromise((resolve) => {
    //         setTimeout(() => {
    //             console.log(2)
    //             resolve()
    //         }, 1000)
    //     })
    // })
    .then((val) => {
        // console.log(val)
        return 4
    })
    // .then((res) => {
    //     return new NewPromise((resolve) => {
    //         setTimeout(() => {
    //             // console.log(4)
    //             resolve(5)
    //         }, 1000)
    //     })
    // })
    // .then((val) => {
    //     console.log(val)
    //     return 6
    // })
    // .then((val) => {
    //     console.log(val)
    //     return 7
    // })
    // .then((val) => {
    //     console.log(val)
    //     return 8
    // })
    // .then((val) => {
    //     console.log(val)
    //     return 9
    // })
    // .then((val) => {
    //     console.log(val)
    //     return 10
    // })