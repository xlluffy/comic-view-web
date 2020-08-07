let proxyObj = {};
proxyObj['/ws'] = {
  ws: true,
  changeOrigin: true,
  target: "ws://localhost:8091"
};
proxyObj['/api'] = {
  ws: false,
  target: 'http://localhost:8091',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/'
  }
};

const webpack = require('webpack');
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ['popper.js', 'default'],
      })
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        // {test: /\.css$/, loader: "style-loader!css-loader"},
        {test: /\.(jpg|png|jpeg|gif|ico)$/, loader: "url-loader"}
      ]
    }
  }
};