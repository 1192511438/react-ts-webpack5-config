const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const  OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin')
const MiniCssExactPlugin=require('mini-css-extract-plugin')
const common =require('./webpack.common')
const { merge } = require('webpack-merge');

    // css/css module 正则表达式
    const cssRegex = /\.css$/;
    // sass/sass module 正则表达式
    const sassRegex = /\.(scss|sass)$/;

const prod={
    mode:'production',
    output:{
        chunkFilename: 'chunks/[name].[ext]',
        filename:'js/[name].[chunkhash].js',
        assetModuleFilename: 'images/[name].[hash].[ext]' ,//file-loader url-loader 存放的地方（file-loader url-loader被弃用，现在用自带的asset）
          } ,
      
    devtool: 'nosources-source-map',

    module:{
        rules:[
            {test:cssRegex,use:[MiniCssExactPlugin.loader,'css-loader','postcss-loader']},
            {test:sassRegex,use:[MiniCssExactPlugin.loader,'css-loader','postcss-loader','sass-loader']}
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new MiniCssExactPlugin({
            filename: "css/[name].[chunkhash].css"
          }),
        new OptimizeCssAssetsWebpackPlugin()
       
      ],

      optimization:{
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
                    commons:{
                    chunks:'all',
                    minSize:0,	//最少提取字节数
                    minChunks:2,	//最少被几个chunk引用
                    priority:-20 ,//优先级
                    reuseExistingChunk: true,
                    name:'common'
                        },
                    antd: {
                        chunks:"all",
                        test:/[\\/]node_modules[\\/]antd/,
                        priority: 15,
                        name:'antd',
                        reuseExistingChunk: true,
                       
                          }
                     , echarts: {
                          test: /[\\/]node_modules[\\/]echarts/,
                          name: 'echarts',
                          priority: 16,
                          reuseExistingChunk: true,
                          },
                          react:{
                            test: /[\\/]node_modules[\\/](react|react-dom)/,
                            name: 'react',
                            priority: 17,
                            reuseExistingChunk: true,
                          },
                          redux:{
                            test: /[\\/]node_modules[\\/](redux|redux-thunk|react-redux)/,
                            name: 'redux',
                            priority: 18,
                            reuseExistingChunk: true,
                          },
                          leaflet:{
                            test: /[\\/]node_modules[\\/]leaflet/,
                            name: 'leaflet',
                            priority: 18,
                            reuseExistingChunk: true,
                          },

                    }
                    
              }
            }
      
}


module.exports= env=>(merge(common,prod))