// 快排
/**
 * 选择一个值为基准点，小的放左边，大的放右边
 * 再对左右进行递归
 */


// const expList = [1, 3, 6, 2, 7, 11, 0, 5]

// 随机生成一个数组
const expList = Array.apply(null, { length: 20 }).map(it => {
    return Math.floor(Math.random() * 20)
})

// 交换数值
const swap = (arr, i, j) => {
    let k = arr[i]
    arr[i] = arr[j]
    arr[j] = k
}

// 一次遍历，使标志值的左边小，右边大
const pivotFun = (arr, start, end) => {
    let j = start
    let pivot = arr[end]
    for(let i = start; i <= end; i++) {
        if (arr[i] <= pivot) {
            if (i === j) {
                j++
                continue
            }
            swap(arr, i, j)
            j++
        }
    }
    return j - 1
}

// 递归调用
const quickSort = (arr, start, end) => {
    // 当不足两个值时，退出递归调用
    if (end - start < 1) {
        return arr
    }
    let pivotIndex = pivotFun(arr, start, end)
    quickSort(arr, start, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, end)
}



quickSort(expList, 0, expList.length - 1)

console.log(expList)