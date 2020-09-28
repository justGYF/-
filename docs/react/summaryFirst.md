# React学习总结一

## 生命周期 `16版本之后` --- 官方文档的搬运工

1. 挂载
* constructor()
  初始化数据
* static getDerivedStateFromProps(props, state)
会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用
* render() 
  class 组件中唯一必须实现的方法。创建dom
* componentDidMount()
 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

 2. 更新
* static getDerivedStateFromProps(props, state)
* shouldComponentUpdate(nextProps, nextState)
render前的钩子,可进行判断是否更新,返回 false，则不会调用 render()。
* render()
* getSnapshotBeforeUpdate(prevProps, prevState)
 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
* componentDidUpdate()
组件更新后的处理

 3. 卸载
 * componentWillUnmount()
会在组件卸载及销毁之前直接调用

 4. 错误处理
 * static getDerivedStateFromError(error)
 会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
 * componentDidCatch(error, info)
 生命周期在后代组件抛出错误后被调用。


## 兄弟组件通信 --- 状态提升

1. 子组件通过props获取父元素的传值

```
    <father>
        <son name={this.name} change={this.handleChange}></son>
    </father>
``` 

子组件可以通过 this.props.name, this.props.change 获取父组件的属性值和方法(class组件形式, 函数传参直接使用 props.xxx)

2. 以一的形式进行兄弟组件通信

```
    class Father extends Component {
        constructor () {
            this.state = {
                name1: 'xxx',
                name2: 'zzz'
            }
        }

        const change1 = (val) => {
            this.setState({
                name2: val
            })
        }

        const change2 = (val) => {
            this.setState({
                name1: val
            })
        }

        render () {
            <div>
                <Son1 name1={this.name1} change={this.handleChange1}></Son1>
                <Son2 name2={this.name2} change2={this.handleChange2}></Son2>
            </div>
        }
    }
``` 

当`子组件一` 触发 this.props.change, 在父组件中对`子组件二`绑定的值进行改变,以此达到兄弟组件的通信, 即兄弟组件的通信状态值需要维护在父组件中


## 高阶组件HOC

React中用于复用组件逻辑的一种高级技巧
高阶组件是以组件为参数的`函数`,返回新的组件

```
// hoc对基础组件进行扩展, 例:
// 自定义点击行为, 自定义文本内容

const AddActive = Comp => {
    // 返回新的组件,可以添加方法,生命周期的处理
    return class extends Component {
        constructor () {
            super()
            this.state = {
                num: 1
            }
        }

        print = () => {
            // preState指改变前的state, props指更新后的
            this.setState((preState, props) => {
                return {
                    num: preState.num + 1
                }
            })
        }

        render () {
            console.log(this.props)
            return (
                <Comp {...this.props} click={this.print} text={this.state.num}></Comp>
            )
        }
    }
}



// 基础组件
class ShowName extends Component {
    render () {
        return (
            <div onClick={this.props.print}>{ this.props.text }</div>
        )
    }
}

const A = AddActive(ShowName)

export default A
```


## 组件组合 Composition

类似VUE的Slot, react通过props.children获取组件的子元素

例: 一组单选框的实现

```
// 一个单选框
// {children, ...rest} --- 解构props, 获取子节点和参数

function Radio ({children, ...rest}) {
    return (
        <label>
            <input type="radio" {...rest}>
            { children }
        </label>
    )
}

function RadioGroup (props) {
    return (
        <div>
            {
                // React.Children可以对子节点进行遍历
                // React.cloneElement可以返回子节点的拷贝，并修改子节点
                // 子组件的属性不可以直接修改
                React.children.map(props.children, child => {
                    return React.cloneElement(child, {name: props.name})
                })
            }
        </div>
    )
}


function TheRadio () {
    return (
        // Radio作为RadioGroup的子节点
        <RadioGroup name="mvvm">
            <Radio value="vue">vue</Radio>
            <Radio value="react">react</Radio>
            <Radio value="angular">angular</Radio>
        </RadioGroup>
    )
}


export default TheRadio
```

