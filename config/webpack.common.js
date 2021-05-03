
    const {resolve}=require('path')
    const HtmlWebpackPlugin=require('html-webpack-plugin')    
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const CopyPlugin = require("copy-webpack-plugin");

    module.exports={
    context:process.cwd(),
    entry:'./src/index.js',
    output:{
        path:resolve(__dirname,'../dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
                {
                     test: /\.(jsx|js|ts|tsx)?$/,
                     use: [{loader:"babel-loader",
                            options: {
                                cacheDirectory: true,
                                cacheCompression: false
                    }}],
                     include: resolve(__dirname, '../src'),
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            
        ]
    },
    plugins:[new HtmlWebpackPlugin({template:'public/index.html',title: 'Custom template'}),
             new CleanWebpackPlugin(),
             new CopyPlugin({
              patterns: [
                  {
                      from: resolve(__dirname,'../public/image/'),
                      to: resolve(__dirname, "../dist/assets"),
                      globOptions: {
                          ignore: [ "**/index.html"],
                        },
                        noErrorOnMissing: true,
                    }
              ],
            })          
            ],
 
    resolve: {
        extensions: ['.js', '.jsx','.ts','.tsx','.scss','.css'],
        alias: {
          '@': resolve(__dirname,'../src'),
        },
      }, 
      optimization:{
        usedExports:true,
        minimize:true,
        splitChunks:{
            chunks: 'all',//异步同步都可以分代码块
            minSize: 30000,//import最小引入多少kb才会分代码块，现在为20kb
            minChunks: 1,//只要import出现一次就可以chunk
            maxInitialRequests:4 ,//限制入口的拆分数量，默认3，一个入口能分离几个代码块
            maxAsyncRequests:3,//限制异步模块内部的并行最大请求的，说白了你可以理解为每个import()它里面的最大并行请求数量
            automaticNameDelimiter:'~',//默认webpack将会使用入口名和代码块的名称生成命名，如vendors~main.js
            cacheGroups:{
				//设置缓存组用来抽取满足不同规则的chunk，下面生成common为例
                    vendors:{
                    chunks:'all',
                    test:/node_modules/,//条件
                    priority:-10 ,//优先级
                    reuseExistingChunk: true,
                    name:'vendor'
                            }		,
                    //这里就是放置懒加载的代码
                    commons:{
                    chunks:'all',
                    minSize:0,	//最少提取字节数
                    minChunks:2,	//最少被几个chunk引用
                    priority:-20 ,//优先级
                    reuseExistingChunk: true,
                    name:'common'
                        },
                        //antd太大，还是分开好
                    antd: {
                        chunks:"all",
                        test:/[\\/]node_modules[\\/]antd/,
                        priority: 15,
                        name:'antd',
                        reuseExistingChunk: true,
                       
                          }
                          //echarts这玩意多大不用说了吧
                     , echarts: {
                          test: /[\\/]node_modules[\\/]echarts/,
                          name: 'echarts',
                          priority: 16,
                          reuseExistingChunk: true,
                          },
                          react:{
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)/,
                            name: 'react',
                            priority: 17,
                            reuseExistingChunk: true,
                          },
                          // redux:{
                          //   test: /[\\/]node_modules[\\/](redux|redux-thunk|react-redux)/,
                          //   name: 'redux',
                          //   priority: 18,
                          //   reuseExistingChunk: true,
                          // },   //很多前端程序员对于redux这个问题有很多争论，到底是用还是不用，虽然useContext和useReducer的结合可以等于redux
                          //但是还是会有争论，有些大佬觉得没必要，没人觉得redux还是有它的作用，我个人觉得redux，没有啥用了，尽管我还是安装啊
                          //仅代表个人观点，有关redux中间件可以解决异步的问题，但是useReducer+useContext对于这个问题目前我了解到的只有在useEffect解决
                          //不想用redux的话就删除对应包。这段代码就注释吧，redux也不大.
                          
                          //这个也很小，写在这里，只是想说明，，使用了也别打开了，放在vendor里面就行我这里用了leaflet
                          // leaflet:{
                          //   test: /[\\/]node_modules[\\/]leaflet/,
                          //   name: 'leaflet',
                          //   priority: 18,
                          //   reuseExistingChunk: true,
                          // },

                    }
                    
              }
            }

}