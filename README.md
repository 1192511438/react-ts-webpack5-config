### 手动自己配置的webpack5+react+ts+react-router-dom+antd+echarts+redux全家桶 里面还配置了leaflet，不用卸载

### 首先npm install or cnpm install 

### 使用npm run start 即可完成webpack-dev-serve的调用

### npm run build:dev npm run build:prod 一个生产环境编译 一个开发环境编译

### 这里主要是为了让大家更熟悉webpack配置，我在配置的过程中也踩了很多坑。

### 个人觉得这里面好像还是少了点mock


### 目录结构

```
         config:里面存放着webpack配置文件
           ├──webpack.common.js 存放着公共配置  
           ├── webpack.dev.js   存放着开发环境配置
           ├── webpack.prod.js  存放生产环境配置
        
        dist:编译后的文件，
        public：对应静态资源
            ├──index.html html-webpack-plugin对应的html
            ├──image 一些公共图片可以存放到这里
            ├──js  和图片一样，基本上也不用
        src：代码入口 我觉得没必要介绍，个人有个人的写法
         ├──component 组件
         ├──redux 写redux的地方 ---一般有store.js,入口文件，creatActions.js store.dispatch()里面直接引用     reducer.js-存放reducer的
         ├──router一般router都会有自己一个对应的文件，根据这个表再组件中调用map方法即可
         ├──css--公共css
         
         
```

 ###  代码肯定也都会写，来说说webpack配置吧

 ### webpack5配置

 #### css sass
 ···
    css其实没啥可说的，我这里使用的是css scss,  需要完成 如果配置scss，先配置sass-loader，sass-loader需要安装sass sass-loader node-sass或者dart-sass  1.css-loader 2.生产环境style-loader 开发环境MiniCssExactPlugin插件的配置，
    3.开发环境把css代码分离出来，使用 OptimizeCssAssetsWebpackPlugin
 ···

 ### js ts jsx tsx
 ···
    首先我这里没有配置eslint，如果你使用的话，可以使用eslint-webpack-plugin插件（eslint-loader弃用了），去webpack官网即可看到说明，很简单。

    ts tsx的配置有好几种，比较主流的就是3种.ts-loader,awesome-typescript-loader,@babel/preset-typescript这三种任选其一就好
    我观看了npm的每周下载量，发现最流行的是@babel/preset-typescript，这种是再babel7推出的一种方案，我这里的配置也是选择的这种配置，随大流准没错。 
    
    js jsx，这配置还是老几样，@babel/preset-env，@babel/preset-react ，使用"useBuiltIns":"usage"，也就是按需加载，@babel/plugin-transform-runtime懂得都懂，不懂得可以看一下我写的文章https://www.jianshu.com/p/ead3c47029ba，这里也就不过多介绍了。

    babel把缓存打开提高速率！

 ···

 ### png 等等图片处理
 ···
    如果有了解老版本webpack的话，以前是使用file-loader url-loader，现在webpack本身就可以自己处理了，asset/resource asset asset/inline
 ···

 ### dll
···
 首先这里没有使用dll，主要是因为现在webpack5打包速度可以，dll其实也是处于被弃用的阶段，vue-cli create-react-app都放弃了dll
 ，后面HardSourceWebpackPlugin又出现了，打包速度巨快这个插件，后来webpack5就内置了这个插件，dll还是有必要了解一下的。
···

### tree-shanking
···
    树摇：这个概念也算是一个面试题了吧，
    这也是一个加快打包速度的方法。
    就是把没用的代码删除。 需要注意的是package.json sideEffects 可能会把css扔掉
    
    antd，还需要引用一个插件 babel-plugin-import，即可完成按需加载，不是所有都可以完成，必须是代码分开写，
    react就不可以完成按需加载
···

### splitChunks
···
    这个方法是为了解决打包代码大的问题，可以把代码拆分出多个js文件，1个500kb和2个250kb，那肯定后者更好。
    我这里对应代码注释应该相当多了吧，这个主要是作用于多入口，单入口，效果不明显，主要是为了把框架等移除出去 或者是懒加载
···

### 开发环境
···
    配置webpack-dev-server 打开hmr
     source-map 配置方便出错误找到位置
···


### 生产环境

···
    webpack-bundle-analyzer 可以更方面的看出打包各部分体积
···








