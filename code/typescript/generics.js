function CopyKey(target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
}
var x = { a: 1, b: 3 };
CopyKey(x, { a: 2 });
