// 订阅发布模式

// on emit off once（once_on）

class Pubsub  {
    constructor () {
        this.handle = {}
    }

    emit (event, ...args) {
        if (this.handle[event]) {
            this.handle[event].forEach(item => {
                return item(...args)
            })
        } else {
            return false
        }
    }

    on (event, func) {
        if (this.handle[event]) {
            this.handle[event].push(func)
        } else {
            this.handle[event] = [func]
        }
    }

    // 只发布一次，删除此类型的订阅，并只执行一次 
    once (event, fn) {
        const func = (...args) => {
            this.off(event, func)
            fn(...args)
        }
        this.on(event, func)
    }

    // 卸载某订阅
    off (event, func) {
        if (this.handle[event]) {
            const index = this.handle[event].indexOf(func)
            if (index >= 0) {
                return this.handle[event].splice(index, 1)
            }
        } else {
            return false
        }
    }
}


// 订阅者
class Subscribe {
    constructor(name, content) {
        this.name = name
        this.content = content
    }
    on (type, fn) {
        this.content.on(type, fn)
    }
    once (event, fn) {
        this.content.once(event, fn)
    }
    off (event, fn) {
        this.content.off(event, fn)
    }
}

// 发布者
class Publish {
    constructor (name, content) {
        this.name = name
        this.content = content
    }
    emit (event, ...args) {
        this.content.emit(event, ...args)
    }
}

/**
 * 订阅者( Subscribe ); 发布者( Publish ); 处理器 (Pubsub)
 * 订阅者和发布者不耦合，相互隔离，关联点为 event
 * 发布者发布event, 所有订阅此event的用户接受此响应
 * 
 * 订阅者方法： 订阅(on)   订阅一次(once)  卸载订阅(off)
 * 发布者方法： 发布(emit)
 * 
 * 其实处理器包含所有的方法，并且存储event集合，加上Subscribe, Publish两个类，只是为了
 * 看起来更加有角色感，本质上调用的都是同一个 Pubsub new的对象
*/


// 处理器，只需要一个，每个订阅者，发布者在创建的时候，都需要绑定这个处理器
const pubsub = new Pubsub()

const TYPE_1 = 'music'
const TYPE_2 = 'dance'
const TYPE_3 = 'draw'


const firstP = new Publish('first', pubsub)
const secondP = new Publish('second', pubsub)

const Tom = new Subscribe('tom', pubsub)
const Jerry = new Subscribe('Jerry', pubsub)
const Sunny = new Subscribe('sunny', pubsub)

let tomFn = (val) => {
    console.log(`Tom - ${val}`)
}
let jurryFn = (val) => {
    console.log(`Jerry - ${val}`)
}
let sunnyFn = (val) => {
    console.log(`Sunny - ${val}`)
}

Tom.on(TYPE_1, tomFn)
Jerry.on(TYPE_2, jurryFn)
Sunny.once(TYPE_3, sunnyFn)

firstP.emit(TYPE_1, TYPE_1)
firstP.emit(TYPE_2, TYPE_2)
firstP.emit(TYPE_3, TYPE_3)

Jerry.off(TYPE_2, jurryFn)
secondP.emit(TYPE_2, TYPE_2)





