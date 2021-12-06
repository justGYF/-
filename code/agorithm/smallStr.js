/**
 * 最小字符串
 * 给定一个字符串（纯字母），交换一次字母位置，使得此字符串最小
 */

// exp: data
let expStrList = [
    'abcdef',
    'aaccdbb',
    'dfbvca',
    'sdaefsga',
    'bccsdaf'
]

const smallFun  = (str = '') => {
    if (str === '') {
        return
    } else {
        str = str.split('')
        let tag = 0, k1 = 0, k2 = 0
        for (let i = 0; i < str.length - 1; i++) {
            let a = str[i].charCodeAt()
            let flag = false
            for(let j = i + 1; j < str.length; j++) {
                let b = str[j].charCodeAt()
                if (a - b > tag) {
                    tag = a - b
                    k1 = i
                    k2 = j
                    flag = true
                }
            }
            if (flag) {
                break
            }
        }

        let s = ''
        s = str[k1]
        str[k1] = str[k2]
        str[k2] = s

        console.log(str.join(''))
    }
}

expStrList.forEach(it => {
    smallFun(it)
})
