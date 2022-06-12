const CracoLessPlugin = require('craco-less')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', //可选值有server static disabled
        generateStatsFile: false,
        statsOptions: { source: false },
        openAnalyzer: false
      })
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(0, 82, 204)',
              '@font-size-base': '16px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  externals: {
    electron: 'require("electron")'
  }
}
