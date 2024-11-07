const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const path = require("path");


const THEME_NAME = "pero-theme";

const entries = [
  "login",
  "register",
  // "login-reset-password",
  // "login-update-profile",
  // "login-idp-link-confirm",
  // "login-idp-link-email"
];


module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    entry: () => {
      return entries.reduce((acc, entry) => ({
        ...acc,
        [entry]: path.resolve(__dirname, "src", "views", entry, "index.ts")
      }), {});
    },
    output: {
      path: path.resolve(__dirname, "..", "themes", THEME_NAME, "login"),
      filename: "resources/js/[name].js",
      publicPath: "/",
    },
    devtool: isDevelopment ? "inline-cheap-module-source-map" : false,
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue", ".json", ".scss"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/assets": path.resolve(__dirname, "src/assets"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/helpers": path.resolve(__dirname, "src/helpers"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/layouts": path.resolve(__dirname, "src/layouts"),
        "@/types": path.resolve(__dirname, "src/types"),
        "@/views": path.resolve(__dirname, "src/views"),
      },
    },
    mode: isDevelopment ? "development" : "production",
    watch: isDevelopment ? true : false,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: { sourceMap: isDevelopment, extract: false },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-typescript"],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: { postcssOptions: { plugins: [require("autoprefixer")()] } },
            }
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      ...entries.map((entry) => 
        new HtmlWebpackPlugin({
          inject: false,
          template: path.resolve(__dirname, "src", "views", entry, "index.ftl"),
          filename: `${entry}.ftl`,
          minify: false,
        }),
      ),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, "src", "static"), to: path.resolve(__dirname, "..", "themes", THEME_NAME, "login") },
          { from: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, "..", "themes", THEME_NAME, "login", "resources") }
        ],
      }),
      new DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ],
    ...(isDevelopment ? {} : {
      optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      },
    }),
  };
};
