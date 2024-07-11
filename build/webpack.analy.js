// 分析打包速度
const prodConfig = require('./webpack.prod.js')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin();
const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 使用smp.wrap方法,把生产环境配置传进去
module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    // 分析webpack构建结果文件，自动打开分析体积窗口
    new BundleAnalyzerPlugin()
  ]
}))
