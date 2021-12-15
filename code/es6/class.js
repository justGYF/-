class A {
    constructor () {
        this.s = '2'
    }
    // 静态方法，this只想class, 实例无法调用此方法
    static classMethod () {
        console.log('it is static method')
    }

    conA () {
        console.log('A')
    }
}

A.classMethod()

// 报错：s.classMethod is not a function
// var s = new A()
// s.classMethod()

// super关键字： 作为函数，代表父类的构造函数，作为对象，在普通方法中，指向父类的原型，在静态方法中，指向父类
// super取不到父级实例中的属性或方法
class B extends A {
    constructor(a) {
        super()
        this.s = a
    }
}
var c = new B()
console.log(c.s)


// 继承
// class A extends B,C {}  这样不可以实现多继承，需要封装mixin方法

const mixin = (...mixins) => {
    class Mixin {
        constructor () {
            for(let mi of mixins) {
                // 拷贝实例属性 - constructor
                copyProperties(this, new mi())
            }
        }
    }

    for (let mi of mixins) {
        // 复制静态属性
        copyProperties(Mixin, mi)
        // 复制原型上的属性
        copyProperties(Mixin.prototype, mi.prototype)
    }
    return Mixin
}

const copyProperties = (targe, source) => {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(targe, key, desc)
        }
    }
}

class Dog {
    eat () {
        console.log('eat')
    }
}

class Cat {
    jump () {
        console.log('jump')
    }
}

class Sy extends mixin(Dog, Cat) {
    constructor() {
        super()
    }
}

// let syInfo = new Sy('s')
// syInfo.eat()
// syInfo.jump()
