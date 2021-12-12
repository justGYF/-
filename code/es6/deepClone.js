const deepClone = (target, maps = new Map()) => {
    if (typeof target === 'object' && target !== null) {
        let newObj = target instanceof Array ? [] : {}

        if (maps.get(target)) {
            return maps.get(target)
        }

        maps.set(target, newObj)

        for(let key in target) {
            if (typeof target[key] === 'object' && target[key]) {
                newObj[key] = deepClone(target[key], maps)
            } else {
                newObj[key] = target[key]
            }
        }
        return newObj

    } else {
        return target
    }
}


expObj = {
    a: 1,
    b: 's',
    c: function() {console.log('s')},
    d: null,
    e: undefined,
    f: [1, 2, 3, {a: 1}, {c: {b: {e:1}}}],
    g: { h: { i: { j: 1 } } }
}
expObj.j = expObj
let a = deepClone(expObj)
console.log(a.toString())