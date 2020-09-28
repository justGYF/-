# webpack4版本下打包优化方式整理

## mode: production

| 选项 | 描述|
| --- | --- |
| development | 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin |
|production|会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.|

**各类插件介绍**
| 名称 | 简介 |
| --- | --- |
| NamedChunksPlugin | 使用 chunkName 来替换 chunkId，实现固化 chunkId，保持缓存的能力,`在 webpack4 中，只需在optimization的配置项中设置 namedChunks 为 true 即可。` |
| NamedModulesPlugin |使用 moduleName 来替换 moduleId,当开启 HMR 的时候使用该插件会显示模块的相对路径(查看要修补(patch)的依赖。)，建议用于开发环境|
|FlagDependencyUsagePlugin|编译时标记依赖|
|FlagIncludedChunksPlugin|检测并标记模块之间的从属关系|
|ModuleConcatenationPlugin|: 可以让webpack根据模块间的关系依赖图中，将所有的模块连接成一个模块。|
|NoEmitOnErrorsPlugin|在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误|
|OccurrenceOrderPlugin|告诉webapck各个模块间的先后顺序，这样可以实现最优的构建输出。|
|SideEffectsFlagPlugin|告诉webapck去清除一个大的模块文件中的未使用的代码，这个大的文件模块可以是自定义的，也可以是第三方的（注意：一定要`package.json`文件中添加`"sideEffects": false`|
|UglifyJsPlugin|压缩js|


在生产环境下,会自动开启Tree-Shaking, Scope-Hosting
Scope-Hosting: 提升作用域减少冗余代码


## 参考文章
http://webpack.html.cn/guides/
