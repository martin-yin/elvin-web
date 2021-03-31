const { override, fixBabelImports, addLessLoader, overrideDevServer, watchAll } = require('customize-cra')

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true
    })
  ),
  devServer: overrideDevServer(watchAll())
}
