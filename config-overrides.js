const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  overrideDevServer,
  watchAll
} = require('customize-cra')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isEnvProduction = process.env.NODE_ENV === 'production'

const addCompression = () => config => {
  if (isEnvProduction) {
    config.plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 1024,
        minRatio: 0.9
      })
    )
  }
  return config
}

// 查看打包产物
const addAnalyzer = () => config => {
  if (isEnvProduction) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
  return config
}

const addCdn = () => config => {
  if (isEnvProduction) {
    config.devtool = false
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }
  return config
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true
    }),
    addCdn(),
    addAnalyzer(),
    addCompression(),
    addWebpackPlugin(
      // 终端进度条显示
      ProgressBarPlugin()
    )
  ),
  devServer: overrideDevServer(watchAll())
}
