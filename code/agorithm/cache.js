/**
 * 简单内存池 - size = 100
 * REQUEST = n 申请大小为n的内存地址
 * RELEASE = m 释放以m地址开头的内存
 * 从低位到高位分配内存，REQUEST成功就输出内存的首地址，RELEASE成功不输出
 * 
 */

// exp: data - 输出 - 0 10 20 0 0
const printData = [
    'REQUEST=10',
    'REQUEST=10',
    'REQUEST=10',
    'RELEASE=0',
    'REQUEST=10',
]

// 输入处理
const handlePrint = (arr) => {
    arr = arr.map(item => {
        return item.split('=')
    })
    return arr
}

const printList = handlePrint(printData)

const fun = () => {
    let size = new Array(100).fill(-1), len = 100, obj = {}, num = -1

    printList.forEach(it => {
        let printSize = Number(it[1]), printType = it[0]
        if (printType === 'REQUEST') {
            if (printSize > len || printSize === 0) {
                console.log('存', 'error')
            } else {
                // 存
                for (let i = 0; i < size.length; i++) {
                    if (size[i] === -1) {
                        let flag = true
                        let tagIndex = i
                        // 判断内存是否够用
                        for (let j = 0; j < printSize; j++) {
                            if (size[i + j] !== -1) {
                                flag = false
                                break
                            }
                        }
                        if (flag) {
                            num++
                            console.log('存', tagIndex)
                            // 将已存的内存置为 num
                            for (let j = 0; j < printSize; j++) {
                                size[i + j] = num
                            }
                            obj[tagIndex] = {
                                len: printSize,
                                index: tagIndex
                            }
                            break
                        }
                    }
                }
            }
        } else {
            // 释放
            if(!obj[printSize]) {
                console.log('取', 'error')
            } else {
                let { index, len } = obj[printSize]
                for (let i = index; i < len; i++) {
                    size[i] = -1
                }
                console.log('取', index)
            }
        }
        
    });
}
fun()
