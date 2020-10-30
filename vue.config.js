const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const TersetPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const selfSigned = require('openssl-self-signed-certificate');

function getGitVersionInfo() {
  if (process.env.NODE_ENV === 'production') {
    try {
      let fs = require('fs')
      let gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/master
      let ref = gitHEAD.split(': ')[1] // refs/heads/master
      let branchName = gitHEAD.split('/')[2] // master
      let gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：db3b1d0e91f41026ebf50fc20a17df8a5317dd57
      let gitCommitVersion = '"' + branchName + ': ' + gitVersion + '"' // 例如dev环境: "master: db3b1d0e91f41026ebf50fc20a17df8a5317dd57"
      return gitCommitVersion
    } catch (error) {
      console.log(error)
      return ''
    }
  } else {
    return ''
  }
}

//用于标记项目发布时间
process.env.VUE_APP_BUILDTIME = new Date().toString() + getGitVersionInfo()

module.exports = {
  //publicPath: '/dist/',
  assetsDir: 'static',
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpg|jpeg|gif|svg|svgz)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.ANALYZ_ENV) {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      //压缩插件
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false, //不删除源文件
        })
      )
      config.optimization.minimizer.push(
        new TersetPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    } else {
      config.devtool = 'source-map'
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.less')],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8012,
    // https: {
    //   key: selfSigned.key,
    //   cert: selfSigned.cert,
    // },
    // hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://接口服务器地址',
      },
    },
    before: process.env.VUE_APP_MOCK === 'true' ? require('./mock') : null,
  },
}
