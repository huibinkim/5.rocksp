const path = require("path");
const webpack = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); //핫 리로딩을 위해

module.exports = {
  name: "response-setting",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                //예전 버젼도 지원할 수 있게 하는 것
                targets: {
                  //presets에 대한 설정
                  browsers: ["> 5% in KR", "last 2 chrome versions"], //browserslist 사이트
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ], //핫 리로딩을 위한],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin(), //핫 리로딩
  ],
  output: {
    path: path.join(__dirname, "src"),
    filename: "App.js",
    publicPath: "/src/",
  },
  devServer: {
    devMiddleware: { publicPath: "/src/" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
