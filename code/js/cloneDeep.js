const obj = {
    a: 1,
    b: '2',
    c: [1, 2, {c: 3, d: {e: [1,2,3]}}],
    d: function () {
        console.log('d')
    },
    e: null,
    f: undefined,
    g: false
}

const cloneDeep = (target, map = new WeakMap()) => {
    if (typeof target !== 'object') {
        return target
    } else {
        // 判断是数组还是obj
        let obj = target instanceof Array ? [] : {}
        // 判断是否被循环引用
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, obj)

        // 遍历target，进行拷贝
        for (key in target) {
            // 将object递归
            if (target[key] && typeof target[key] === 'object') {
                obj[key] = cloneDeep(target[key], map)
            } else {
                obj[key] = target[key]
            }
        }
        return obj
    }
}

obj.h = obj
var c = cloneDeep(obj)
console.log(c)