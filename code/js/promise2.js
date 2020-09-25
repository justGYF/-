class NewPromise {
    constructor (handle) {
        this.status = 'pedding'
        this.value = null

        this.fulfilledArr = []
        this.rejectedArr = []

        handle(this.resolve.bind(this), this.reject.bind(this))
    }

    // onFulfilled, onRejected 只代表then的回调方法
    then (onFulfilled, onRejected) {
        const { value, status } = this

        // fulfilledNext 相当于 then中的resolve - 改变status状态
        // rejectedNext 相当于 then中的reject
        return new NewPromise((fulfilledNext, rejectedNext) => {
            let fulfilled = (val) => {
                try {
                    if (typeof onFulfilled !== 'function') {
                        fulfilledNext(val)
                    } else {
                        let res = onFulfilled(val)
                        if (res instanceof NewPromise) {
                            res.then(fulfilledNext, rejectedNext)
                        } else {
                            fulfilledNext(res)
                        }
                    }
                } catch (err) {
                    rejectedNext(err)
                }
            }

            let rejected = (err) => {
                try {
                    if (typeof onRejected !== 'function') {
                        rejectedNext(err)
                    } else {
                        let res = onRejected(err)
                        if (res instanceof NewPromise) {
                            res.then(fulfilledNext, rejectedNext)
                        } else {
                            rejectedNext(res)
                        }
                    }
                } catch (err) {
                    rejectedNext(err)
                }
            }

            switch (status) {
                case 'pedding':
                    this.fulfilledArr.push(fulfilled)
                    this.rejectedArr.push(rejected)
                    break
                case 'fulfilled':
                    fulfilled(value)
                    break
                case 'rejected':
                    rejected(value)
                    break
                default: break;
            }
        })
    }


    resolve (val) {
        if (this.status !== 'pedding') {
            return
        } else {
            
            // 执行事件
            const run = () => {
                this.status = 'fulfilled'
                this.value = val
                let cb;
                while (cb = this.fulfilledArr.shift()) {
                    cb(val)
                }
            }
            setTimeout(run, 0)
        }
    }

    reject (err) {
        if (this.status !== 'pedding') {
            return
        } else {
            
            // 执行事件
            const run = () => {
                this.status = 'rejected'
                this.value = err
                let cb;
                while (cb = this.rejectedArr.shift()) {
                    cb(err)
                }
            }
            setTimeout(run, 0)
        }
    }
}


// var b = new NewPromise((resolve, reject) => {
//     resolve(1)
// })
// b.then(() => {
//     return new NewPromise((resolve) => {
//         setTimeout(()=>{resolve(2)}, 100)
//     })
// }).then((val) => {
//     console.log(val)
// })
// .then(() => {
//     return new NewPromise((resolve) => {
//         setTimeout(()=>{resolve(5)}, 600)
//     })
// }).then((val) => {
//     console.log(val)
// })



new Promise((resolve, reject) => {
    resolve()
}).then(() => {
    new Promise((resolve, reject) =>{
        resolve()
    }).then(() => { 
        return new Promise(() => {
            console.log('4')
        })
    }).then(() => {
        console.log('5')
    })
}).then(() => {
    console.log('6')
})