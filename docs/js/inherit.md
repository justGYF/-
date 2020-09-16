# JS继承

js通过原型链查找实例自身没有的属性和方法

    Function A () {}   ----  构造函数
    A.prototype        ----  原型
    b = new A()        ----  实例

    <!-- 三者关系 -->
    b.__proto__ === A.prototype
    A.prototype.constructor === A

    通过 __proto__ 向上查找 属性和方法

## 寄生组合继承

1. 原型链式继承 
    缺点： 不同实例修改引用类型会被污染

2. 借用构造函数
    缺点： 方法都存在于函数中，无法复用，并且父类方法对子类不可见

3. 组合继承
    缺点：调用两次父类，创建两次属性

4. 原型式
    缺点：相当于浅赋值

5. 寄生式 - 可以进行对象增强
    缺点：浅赋值

6. 寄生组合继承

~~~
function inheritPrototype (son, fat) {
    // 创建一个中间实例，__proto__ 指向父类的原型
    const prototype = objectFun(fat.prototype)
    // 添加constructor, 指向子类
    prototype.constructor = son
    // 实例作为子类的原型
    son.prototype = prototype

    // 将子类和父类通过原型关联起来
}

// 父类
function Animal (type) {
    this.type = type
}
Animal.prototype.breath = function () {
    console.log('all animal nedd breathe')
}

// 子类
function Person (type, age) {
    Animal.call(this, type)
    this.age = age
}

inheritPrototype(Person, Animal)

Person.prototype.play = function () {
    console.log('person play everything')
}

// 实例
const child = new Person('person', 33)
console.log(child.__proto__.constructor === Person)
~~~

**继承：让实例拥有自己的属性，将方法共享，最好理解的还是组合式继承**


