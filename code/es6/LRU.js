// LRU缓存函数

/**
 * 实现 get, put方法
 * size - 最大存储量，put操作会超过size时，需要删除最不常使用的一个数
 * get的值不存在时，返回-1
*/

class  LRUcache {
    constructor (size) {
        this.size = size
        this.cache = new Map()
    }

    get(key) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            return this.cache.get(key)
        } else {
            return -1
        }
    }

    put(key, vlaue) {
        this.cache.set(key, vlaue)
        if (this.cache.size > this.size) {
            // next方法会找到map的第一个值
            this.cache.delete(this.cache.keys().next().value)
        }
        return true
    }
}

const cache = new LRUcache(2)

console.log(cache.put(1, 1))
console.log(cache.put(2, 2))
console.log(cache.get(1))
console.log(cache.get(3))
console.log(cache.put(2, 5))
console.log(cache.get(2))