const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin"); // Ding

const env = process.env.NODE_ENV;

const removeNewLine = (buffer) => {
  return buffer.toString().replace("\n", "");
};

module.exports = {
  mode: env,
  entry: {
    app: "./src/app.ts",
  },

  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      //   { test: /\.js$/, use: `console.log("test")` },

      {
        test: /\.ts$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
      },
      { enforce: "pre", test: /\.ts$/, loader: "tslint-loader" },
    ],
  },
  devtool: "source-map",
  target: "node",
  plugins: [
    new webpack.BannerPlugin({
      banner:
        env === "development"
          ? `
            Build Date :: ${new Date().toLocaleString()}
            Commit Version :: ${removeNewLine(
              childProcess.execSync("git rev-parse --short HEAD")
            )}
            Auth.name :: ${removeNewLine(
              childProcess.execSync("git config user.name")
            )}
            Auth.email :: ${removeNewLine(
              childProcess.execSync("git config user.email")
            )}
            `
          : `
            Build Date :: ${new Date().toLocaleString()}
            `,
    }),
    new CleanWebpackPlugin(),
    ...(env === "development" ? [new NodemonPlugin()] : []),
  ],

  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
