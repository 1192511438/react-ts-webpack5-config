
    const {resolve}=require('path')
    const HtmlWebpackPlugin=require('html-webpack-plugin')    
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const CopyPlugin = require("copy-webpack-plugin");

    module.exports={
    context:process.cwd(),
    entry:'./src/index.js',
    output:{
        path:resolve(__dirname,'../dist'),
        filename:'[name].[hash].js',
        assetModuleFilename: 'images/[name].[hash].[ext]' ,//file-loader url-loader 存放的地方（file-loader url-loader被弃用，现在用自带的asset）
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
                  },
                  {
                    from: resolve(__dirname,'../public/js/'),
                    to: resolve(__dirname, "../dist/assets"),
                  }
                ],
              }),
          
             
              
            ],
 
    resolve: {
        modules: [resolve(__dirname,'../src'), 'node_modules'],
        extensions: ['.js', '.jsx','.ts','.tsx'],
        alias: {
          '@': resolve(__dirname,'../src'),
        },
      }, 

}