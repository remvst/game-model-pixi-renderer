const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
        }),
    ],
});
