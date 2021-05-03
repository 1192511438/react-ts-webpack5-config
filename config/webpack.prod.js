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
        filename:'js/[name].[hash].js',
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

     
      
}


module.exports= env=>(merge(common,prod))