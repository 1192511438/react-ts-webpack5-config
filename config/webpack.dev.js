const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack =require('webpack')
    // css/css module 正则表达式
    const cssRegex = /\.css$/;

    // sass/sass module 正则表达式
    const sassRegex = /\.(scss|sass)$/;

const dev={
    target: 'web',
    devServer:{
        contentBase:'./dist',
        port: 8080,
        open:true,
        hot:true
            },
      plugins:[new webpack.HotModuleReplacementPlugin({})],
      mode:"development",
      devtool: 'inline-source-map',
      module:{
        rules:[    
                {
                test:cssRegex,
                use:['style-loader','css-loader','postcss-loader']
                },
                {
                  test:sassRegex,
                  use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
                }
            ]
      },
      
      }
    
module.exports= env=>(merge(common,dev))