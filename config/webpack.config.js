const path = require('path')
const argv = require('yargs').argv
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssbyebye = require('css-byebye')
const debug = require('debug')('app:config:webpack')
const config = require('./index')
const themeVars = require('../src/styles/theme')


const __DEV__ = config.globalVars.__DEV__
const __PROD__ = config.globalVars.__PROD__
const __TEST__ = config.globalVars.__TEST__

debug('Init webpack config.')
const mainEntry = [path.resolve(config.srcDir, './main')]
if (__DEV__) {
  mainEntry.push(`webpack-hot-middleware/client.js?path=${config.webpack.publicPath}__webpack_hmr&reload=true`)
}

const webpackConfig = {
  mode: __DEV__ ? 'development' : 'production',
  entry: {
    main: mainEntry,
    vendor: [
      'react',
      'react-router-dom',
      'font-awesome-sass-loader'
    ]
  },
  output: {
    path: config.distDir,
    filename: __DEV__ ? '[name].bundle.js' : `[name].[${__PROD__ ? 'chunkhash' : 'hash'}].bundle.js`,
    publicPath: config.webpack.publicPath
  },
  resolve: {
    modules: [
      config.srcDir,
      'node_modules'
    ],
    extensions: ['*', '.js', '.jsx', '.json', '.less']
    // alias: {}
  },
  devtool: config.webpack.sourceMap,
  externals: {},
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin(config.globalVars),
  ]
}

// ------------------------------------
// Module Rules
// ------------------------------------
// JavaScript
webpackConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          modules: false,
          targets: {
            browsers: 'last 2 versions',
            uglify: true
          }
        }]
      ],
      plugins: [
        ['lodash', { 'id': ['lodash'] }],
        ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': true }],
        'babel-plugin-syntax-dynamic-import',
        'babel-plugin-transform-class-properties',
        'babel-plugin-transform-runtime',
        'babel-plugin-transform-object-rest-spread'
      ]
    }
  }]
})

// Images
webpackConfig.module.rules.push({
  test: /\.(jpe?g|png|gif)$/i,
  loader: 'url-loader',
  options: { limit: 8192 }
})

// Fonts
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  webpackConfig.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// Styles
const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    importLoaders: 1,
    localIdentName: '[name]__[local]--[hash:base64:5]',
    sourceMap: !!config.webpack.sourceMap,
    minimize: {
      preset: ['default', {
        autoprefixer: { browsers: ['last 2 versions'] },
        discardComments: { removeAll : true },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: !!config.webpack.sourceMap
      }]
    }
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: !!config.webpack.sourceMap,
    plugins: (loader) => {
      const plugins = []
      plugins.push(cssbyebye({
        rulesToRemove: ['html', 'body', '*'],
        map: false
      }))
      return plugins
    }
  }
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: !!config.webpack.sourceMap,
    includePaths: [path.resolve(config.srcDir, './styles')]
  }
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: !!config.webpack.sourceMap,
    javascriptEnabled: true,
    modifyVars: themeVars
  }
}

const extractStyles = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__
})

webpackConfig.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      sassLoader
    ]
  })
})


webpackConfig.module.rules.push({
  test: /\.less$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      postCssLoader,
      lessLoader
    ]
  })
})

webpackConfig.module.rules.push({
  test: /\.css$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [cssLoader]
  })
})

webpackConfig.plugins.push(extractStyles)

// HTML Template
webpackConfig.plugins.push(new HtmlWebpackPlugin({
  template: path.resolve(config.srcDir, './index.html'),
  favicon: path.resolve(config.srcDir, './statics/favicon.ico'),
  hash: false,
  inject: 'body',
  minify: {
    collapseWhitespace: true
  }
}))

// Development Tools
if (__DEV__) {
  debug('Enable plugins for live development (HMR, NamedModulesPlugin).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

// Production Optimizations
if (__PROD__) {
  debug('Enable plugins for production optimization.')
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      }
    })
  )
}

/* Ensure that the compiler exits on errors during testing so that
they do not get skipped and misreported.*/
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

module.exports = webpackConfig
