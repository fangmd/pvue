const path = require("path");

module.exports = {
  assetsDir: "static",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
    } else {
      config.devtool = "source-map";
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/css/variable.less")]
    }
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8099,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://接口服务器地址"
      }
    }
  }
};
