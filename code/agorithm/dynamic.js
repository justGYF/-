// 动态规划

// 爬楼梯：每次可以上1或2个台阶
// 1. 递归
const fin1 = (n) => {
    if (n < 1) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return fin1(n - 1) + fin1(n - 2)
}

// 2. 递归优化(备忘录算法) - 使用hash保存已经计算过的节点
const fin2 = (n, map = new Map()) => {
    if (n < 1) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    if (map.get(n)) {
        return map.get(n)
    } else {
       let num = fin2(n - 1) + fin2(n - 2)
       map.set(n, num)
       return num
    }
}

// 动态规划解法，从底向上
const fin3 = (n) => {
    if (n < 1) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    let a = 1, b = 2, temp = 0
    for(let i = 3; i <= n; i++) {
        temp = a + b
        a = b
        b = temp
    }
    return temp
}


console.log(fin1(10))
console.log(fin2(10))
console.log(fin3(10))


// 递归三要素： 最优子结构；边界；状态转移方程