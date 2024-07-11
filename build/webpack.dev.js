// webpack.dev.js
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式，不会压缩最终代码；通过判断package中的scripts设置的NODE_ENV来加载对应环境的配置
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升速度
    historyApiFallback: true,// 解决history路由404问题
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    static: { //托管静态资源文件
      directory: path.join(__dirname, "../public"),
    }
  },
  devtool: 'eval-cheap-module-source-map',// 源码映射调试
  plugins: [
    // 开启react模块热替换插件-修改tsx不需要刷新浏览器
    new ReactRefreshWebpackPlugin(),
  ]
})