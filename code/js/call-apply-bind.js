
        // call apply bind实现，obj值为null / undefined, undefined指向window
        // 注意函数的返回值
        Function.prototype.newCall = function () {
            const obj = arguments[0] || window

            const handler = Symbol();

            obj[handler] = this
            const ret = obj[handler](...[...arguments].slice(1))

            delete obj[handler]

            return ret
        }

        // apply -- 数组中的元素都是独立的参数
        Function.prototype.newApply = function () {
            const obj = arguments[0] || window

            const handler = Symbol();

            obj[handler] = this

            let ret;
            console.log(...arguments[1])
            if (typeof arguments[1] === 'object') {
                ret = obj[handler](...arguments[1])
            } else {
                ret = obj[handler]()
            }

            delete obj[handler]

            return ret
        }

        Function.prototype.newBind = function () {
            const obj = arguments[0] || window
            const context = this
            // 获取剩余参数
            const args = [...arguments].slice(1)
            if (typeof context !== 'function') {
                throw new TypeError('Function.prototype.bind - ' +
                    'what is trying to be bound is not callable');
            }

            return function () {
                const newArgs = args.concat([...arguments])
                return context.apply(obj, newArgs)
            }
        }


        var c = {
            age: 1
        }
        function a (b, c, d) {
            return b + c + d 
        }
        function aa (a, f) {
            this.name = 's'
            console.log(this.age)
        }
        aa.newCall(c, ['s', 's', 'f'], 'sd', 'fd')
        aa.newApply(c, [])

        var b = [1,2,3]
        var c = [4,5,6]

        var ss = a.bind(null, 3)
