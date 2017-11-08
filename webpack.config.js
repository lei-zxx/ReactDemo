/**
 * Created by mr.zhang on 2017/8/4.
 */
var webpack = require('webpack');
var path = require('path');
// var HtmlwebpackPlugin = require('html-webpack-plugin');//html模块
// var FastUglifyJsPlugin = require('fast-uglifyjs-plugin');//资源包压缩

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var INDEX = path.resolve(ROOT_PATH, 'src/demo.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
module.exports = {
    devtool: 'eval-source-map',
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        index: INDEX
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].min.js'
    },

    resolve: {
        extensions: [ '.jsx', '.js', '.json'],

    },
    plugins: [
        // new FastUglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     }
        //
        // }),
        new webpack.optimize.UglifyJsPlugin()

    ],

    module: {//在配置文件里添加JSON loader
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: "file-loader?name=images/[hash:8].[name].[ext]"},//图片打包配置
            {
                test: /\.js$/,
                loader: "babel-loader"
            }


        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        // colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },

};
