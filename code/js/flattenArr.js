// 数组扁平化

const arr = [1, 2, 3, ['a', 'b'], ['c', 1, [2, 3, ['e', ['f']]]]]


const flatten = (arr) => {
    return arr.reduce((a,b) => {
        return a.concat(b instanceof Array ? flatten(b) : b)
    }, [])
}

let newArr = flatten(arr)
console.log(newArr)


