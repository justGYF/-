// 原型链 --- 引用类型会被共享
function A () {

}

function B () {

}

B.prototype = new A()

var c = new B()

// 借用构造函数 - 无法复用，A的方法放在内部，不能通过原型链共享，只能重复创建
function A () {

}

function B () {
    A.call(this)
}

var c = new B()

// 组合式 - 获取A的属性，并共享方法，B可以自定义属性方法
// 缺点，A被调用两次，属性被创建两次并覆盖
function A () {

}
A.prototype.fun = function () {}

function B () {
    A.call(this)
}
B.prototype.fun = function () {}

B.prototype = new A()
B.prototype.constructor = B

var c = new B()



// 原型式 -- 参数为object - 没有内置的方法和属性
function objectFun (o) {
    function F() {}
    F.prototype = o
    return new F()
}

// 寄生式 -- 给原型式添加方法
function parasitic (o) {
    const clone = objectFun(o)
    // 进行方法增强
    clone.fun = function () {
        console.log('parasitic\'s function')
    }
    return clone
}



// 原型链 + 借用构造函数 = 组合式
// 原型式 + 方法增强 = 寄生式
// 寄生组合式继承 = 组合式 + 寄生式

function inheritPrototype (son, fat) {
    // 创建一个中间实例，__proto__ 指向父类的原型
    const prototype = objectFun(fat.prototype)
    // 添加constructor, 指向子类
    prototype.constructor = son
    // 实例作为子类的原型
    son.prototype = prototype

    // 将子类和父类通过原型关联起来
}


function Animal (type) {
    this.type = type
}
Animal.prototype.breath = function () {
    console.log('all animal nedd breathe')
}

function Person (type, age) {
    Animal.call(this, type)
    this.age = age
}

inheritPrototype(Person, Animal)

Person.prototype.play = function () {
    console.log('person play everything')
}

const child = new Person('person', 33)
console.log(child.__proto__.constructor === Person)
