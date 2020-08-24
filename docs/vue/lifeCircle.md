# 生命周期简述

## 生命周期流程 
1. new Vue() 创建vue实例
2. observeDate -- 对data的数据进行监测
3. Init Events -- 内部初始化事件
4. Has 'el' option -- 判断是否有el, 有则继续生命周期，否则就中断生命周期，等待 vm.$mount(el) is called
5. Has 'tempalte' option -- 上一步没有中断，则在此判断
6. 上一步 YES, 编译模板，将data的数据和模板生成html; NO, 则将编译模板生成外部html
7. 将编译好的html替换到el指向的内容上
8. 渲染页面 ---  beforeUpdate / updated (应该使用watch替代update钩子)
9. 卸载子组件，页面监听事件
10. 销毁vue实例

## 钩子函数

beforeCreate:  1, 2 之间：无法访问data，el
created: 3, 4之间：已经可以访问data，method等，无法访问el, 可以对vue实例做一些数据预处理
beforeMount: 6, 7之间：页面没有挂载，但是已经生成完成的html，数据和方法皆可访问
mounted: 7, 8之间：页面挂载完成，执行此钩子函数，只执行一次
beforeDestroy: 8, 9 之间：这一步可以用this获取实例
destroyed: 10： vue实例被销毁
