function CopyKey<T extends U, U>(target: T, source: U): T {
    
    for (let key in source) {
        target[key] = (<T>source)[key]
    }
    
    return target
}

let x = { a: 1, b: 3 }
CopyKey(x, {a: 2})
