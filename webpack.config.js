const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app",
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app/"),
      components: path.resolve(__dirname, "src/components/"),
      style: path.resolve(__dirname, "src/style/"),
      config: path.resolve(__dirname, "src/config/"),
      assets: path.resolve(__dirname, "src/assets/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss|css)/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/app/index.html",
      filename: "./index.html"
    }),
    // We don't want to write new compiled files if those would include errors
    // This way, the dev app doesn't break if there's an error in compiling.
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
