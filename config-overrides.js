const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function override(config, env) {
  config.optimization = {
    minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              output: {
                comments: false,
              },
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: false,
          },
        }),
    ],
  }
  return config;
}