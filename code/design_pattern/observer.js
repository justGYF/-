// 观察者模式

// 一对多的依赖关系

// 观察者 - 进行监听，当对象发生变化时，进行响应
// 被观察者 - 观察者的观察对象，当发生变化时，通知观察者


// 和 发布 - 订阅的区别：
// 一个Subject对象的所有观察者只能观察一件事，
// 发布 - 订阅 一个Pubsub（处理器）对象 可以绑定多个事件 



class Subject {
    constructor () {
        this.observerList = []
    }

    addObserver (observer) {
        this.observerList.push(observer)
    }

    removeObserver (observer) {
        const index = this.observerList.findIndex(it => it.name === observer.name)
        if (index >= 0) {
            this.observerList.splice(index, 1)
        } else {
            return false
        }
    }

    notify (...args) {
        this.observerList.forEach(it => it.update(...args))
    }
}

class Observer {
    constructor (name, subject) {
        this.name = name
        if (subject) {
            subject.addObserver(this)
        }
    }

    update (...args) {
        console.log('message')
    }
}

// 被观察者改变后，notify 
// 观察者执行update
const subject = new Subject()
let observerA = new Observer('A', subject)
let observerB = new Observer('B', subject)

observerB.update = (...args) => {
    console.log(...args)
}


subject.notify('2')

subject.removeObserver(observerA)

subject.notify('3')