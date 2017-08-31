const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    devtool: false,
    entry: {
        index: __dirname + "/src/index.js",

        vendors: ["vue", "vue-router", "axios"]
    },
    output: {
        publicPath: "./",
        path: __dirname + "/dist",
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["stage-0", "es2015"]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.css$/,
                loader: "style!css!postcss"
            },
            {
                test: /\.scss$/,
                loader: "style!css!postcss!sass?outputStyle=compressed"
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    postcss: [
        require("autoprefixer")
    ],
    babel: {
        presets: [ "stage-0", "es2015"],
        plugins: [["component", [
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-default"
            }
        ]]]
    },
    node: {//不加socket.io报错无法解析fs,tls,这几个为后端使用的库 浏览器无法解析。所以跳过编译
        fs: "empty",
        tls: "empty"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmp.html",
            chunk: ["index"],
            filename: "index.html"
        }),
        new webpack.ProvidePlugin({//全局暴露axios不用重复import
            axios: "axios",
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};