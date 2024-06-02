const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.ts",
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["main"],
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "[name]-[hash][ext][query]",
    },
    resolve: {
        extensions: ["*", ".js", ".ts"],
        alias: {
            "pixi.js": path.resolve("./node_modules/pixi.js"),
            "pixi.js-legacy": path.resolve("./node_modules/pixi.js-legacy"),
        },
        conditionNames: ["es2015", "import"],
        mainFields: ["es2015", "module", "main"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /node_modules/,
                exclude: /(pixi.js|@pixi)/,
                sideEffects: false,
            },
        ],
    },
};
