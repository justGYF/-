# webpack项目的简单创建和npm link的使用

## 创建webpack项目

### 步骤：

1. 安装全局的node
2. 新建文件夹：例如：webpackDemo, 进入文件夹
3. 初始化，并安装依赖

~~~
	1. 安装wenpack:  npm install webpack webpack-cli --save-dev
	2. 初始化项目：   npm init-y （添加node_modules, package.json）
	3. 安装webpack所需的几个基础插件
		npm install --save-dev html-webpack-plugin   （使用指定的html，并且自动引入js）
		npm install clean-webpack-plugin --save-dev	 （每次打包删除上次的包文件）
		npm install --save-dev webpack-dev-server     (用于node启动服务)
~~~	

4. 根目录添加 index.html; index.js 文件

5. 配置package.json

~~~
// 添加打包(npm run build) 和 启动项目的命令（npm run start）
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"build": "webpack",
	"start": "webpack-dev-server"
},
~~~

6. 根目录添加webpack.config.js文件，并简单配置

~~~
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        filename: '[bundle].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8081
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'two',
            template: './index.html'
        })

    ]
}
~~~

### 至此，一个简单的基于webpack的项目就建立完成，之所以如此，主要是为了使用node启用服务，可以方便的引入第三方依赖文件，并测试npm link


## npm link 的使用及优点

### npm link 作用

当你自主开发了一个插件 xxx，并且上传了npm, 你在本地同时开发几个项目，并且都npm install xxx时，你要修改xxx的功能时，你就可以**使用npm link 创建一个链接，将本地包暴露在全局，并在项目中将对此包的引用指向全局，可以在不同的项目中同时改变对此包的引用**

### 使用实例 ：

* 现有一个插件 gy_select_plugin， 两个项目getNpmPackage， getNpmPackageTwo 都有通过npm安装此插件

* 初始化： 在 gy_select_plugin 源码的根目录执行 npm link， 自动创建了如此指向，将插件暴露于全局(node)
~~~
D:\nodejs\node_modules\gy_select_plugin -> F:\htmlDemo\npm和webpack测试\npmRelease
~~~

* 在具体的项目中 使用 npm link 切换对此插件的引用

~~~
getNpmPackageTwo下执行命令： npm link gy_select_plugin
F:\htmlDemo\npm和webpack测试\getNpmPackageTwo\node_modules\gy_select_plugin -> D:\nodejs\node_modules\gy_select_plugin -> F:\htmlDemo\npm和webpack测试\npmRelease

getNpmPackage下执行命令命令： npm link gy_select_plugin
F:\htmlDemo\npm和webpack测试\getNpmPackage\node_modules\gy_select_plugin -> D:\nodejs\node_modules\gy_select_plugin -> F:\htmlDemo\npm和webpack测试\npmRelease
~~~

* 修改 gy_select_plugin 源码，保存，刷新两个项目，插件修改的地方都已体现。（有兴趣的同学可以自己动手试试，在此不贴图了）

	
### 优点

1. 当自己开发的插件在项目中引入后出现bug，不用直接去node_modules中查找代码，并操作其中的源代码(如果发布的代码是编译后，是无法直接在项目中添加debugger的)

2. 使用npm link 也可以**一处改正，多处响应**，不用在每次修改完，经历 发布，安装，测试的复杂流程

3. 将插件和业务代码分离，降低调试时误操作对代码的影响程度。（假设直接在node_modules中修改源代码，很有可能忘记还原）

### 备注

当要删除 link， 直接unlink 会删除依赖包， 需要重新 npm install xxx

## 引申问题

### 当正式环境报错，并且此问题在本地，测试环境都无法复现，现如何快速定位和调试，直接改代码，不上正式环境无法验证是否改正有效。

1. 根据npm link， 将核心公共的代码放于全局，使正式环境项目的代码引用指向本地，修改本地代码，然后重新构建，打包，部署？？？？

2. 定位： 考虑到环境差距因素，查找和环境差异有关的代码进行排查。???