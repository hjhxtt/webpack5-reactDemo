// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'

// package.json 通过cross-env（兼容各系统的设置环境变量的包）定义的环境变量
console.log('NODE_ENV', process.env.NODE_ENV)  // 'development'/'production'
console.log('BASE_ENV', process.env.BASE_ENV) // dev/test/pre/prod

module.exports = {
  // 入口文件
  entry: path.resolve(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称  js使用chunkhash（js chunk改变才改变），图片字体类使用contenthash（文件改变才改变）
    path: path.resolve(__dirname, '../dist'), // 打包的出口文件夹路径
    clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // style-loader：把css插入到头部style标签中便于热更新替换，MiniCssExtractPlugin：生产环境抽离css
          'css-loader', // 解析 css
          'postcss-loader',// css3浏览器兼容；给css3加浏览器前缀
          //  // 配置 .browserslistrc处理浏览器兼容或创建postcss.config.js配置文件
          //  {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer']
          //     }
          //   }
          // },
        ]
      },
      {
        test: /\.less$/, //匹配所有的 less 文件
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', // 解析css
          'postcss-loader', // css3浏览器兼容；给css3加浏览器前缀
          'less-loader' //解析less文件代码,把less编译为css
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
        use: ['thread-loader', 'babel-loader'] //thread-loader用于开启多线程loader解析（取决于电脑的多核cpu）（需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。）
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name].[contenthash:6][ext]'
        },
      },
      {
        test:/\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/media/[name].[contenthash:6][ext]', // 文件输出目录和命名
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')],// 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({ // 将process.env.BASE_ENV注入到业务代码中，使之可访问（默认可访问process.env.NODE_ENV）
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
  ],
  // 开启webpack持久化存储缓存，改善下一次打包的构建速度
  // 缓存生成的 webpack 模块和 chunk,改善下一次打包的构建速度,第二次打包可提速 90% 左右，缓存的存储位置在node_modules/.cache/webpack
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}

/*
loader
loader执行顺序是从右往左,从下往上的,匹配到css文件后先用css-loader解析css,
最后借助style-loader把css插入到头部style标签中。

文件名hash
优化点：hash改变浏览器才需要重新下载，否者直接用浏览器缓存
*/ 

