const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "eval-source-map",
    entry: {
        index: __dirname + "/src/index.js",
        //login: __dirname + "/src/login.js",
        vendors: ["vue", "vue-router", "axios", "element-ui"]
    },
    output: {
        //publicPath: "./",
        path: __dirname + "/public",
        filename: "[name].js"
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
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmp.html",
            chunk: ["vendor", "index"],
            filename: "index.html"
        }),
        new webpack.ProvidePlugin({//全局暴露axios不用重复import
            axios: "axios",
        }),
        // new HtmlWebpackPlugin({
        //    template: __dirname + "/src/login.tmp.html",
        //    chunk: [ "vendor", "login"],
        //    filename: "login.html"
        // })
    ],
    devServer: {
        contentBase: "./public",
        inline: true,
        hot: true,
        color: true,
        historyApiFallback: true
    }
};