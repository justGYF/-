# v-for不添加key的缺陷

## newVNode oldVNode 比对
    数据层面：
        [1,2,3] -- [1,3]     不添加key, 2删除，3顶替2的位置，但其子组件，与props无关的会复用，导致二显示有误
        [1,2,3] -- [1,2]     index作为key，表示3被删除, 其实是2被删除，3顶替了2，于是node比对，导致显示有误
        [1,2,3] -- [1,3]     添加固定唯一key, 通过diff，只删除2
    
## diff
对于每一层节点（某根节点的子节点）
1. 定义四个指针  oldStart, oldEnd, newStart, newEnd
2. 四个指针两两比对，比较基本属性，判定为sameVnode后，进行其子节点的diff，增，删，改的操作
3. 非sameVnode，先判断newStartVnode是否有key，若有，则在oldNode中查找此key，查找到，则取出此oldNode，进行diff, 若oldNode没有此key，则直接将这个 newStartVnode作为新的节点创建且插入到原有的 root 的子节点中;若newStartVnode没有key，则直接将这个 newStartVnode作为新的节点创建且插入到原有的 root 的子节点中

## 节点比对（old， new --- 旧新Vnode, oldCh, newCh --- 旧新Vnode子节点）
1. old.text !== new.text 替换文本
2. new无文本，diff子节点
3. oldCh, newCh存在且不同，使用updateChildren进行diff
4. oldCh不存在，newCh存在，清空old的文本，将newCh添加到真实dom中
5. oldCh存在，newCh不存在，删除真实dom中的oldCh
6. oldCh有文本节点，而 newCh 没有，那么就清空这个文本节点


patchVnode 实现上面节点对比的功能（确定内容的变化）
updateChildren  实现根节点的子节点的对比，确定子节点的增删，位置等变化

树的按层遍历，patchVnode和updateChildren循环套用，每个节点都可以是根节点

