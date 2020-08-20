# v-for不添加key的缺陷

## newVNode oldVNode 比对
    数据层面：
        [1,2,3] -- [1,3]     不添加key, 2删除，3顶替2的位置，但其子组件，与props无关的会复用，导致二显示有误
        [1,2,3] -- [1,2]     index作为key，表示3被删除, 其实是2被删除，3顶替了2，于是node比对，导致显示有误
        [1,2,3] -- [1,3]     添加固定唯一key
    
## diff
### 无KEY
1. 四个指针  oldStart, oldEnd, newStart, newEnd
2. 通过指针判断节点，sameVnode --- 基本属性相同，进行diff，不同，直接进行dom替换
3. 无sameVnode， 进行 节点的移动，插入，或删除

### 有KEY
1.  无sameVnode，在oldKeyToIndex中找对应节点，无此key, 插入此节点，有则diff