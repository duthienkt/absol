const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    mode: process.env.MODE || "development",
    entry: ['babel-polyfill', "./src/index.js"],
    output: {
        path: path.join(__dirname, "."),
        filename: "./dist/absol.js"
    },
    resolve: {
        modules: [
            './node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: [['es2015', { modules: false }]] }
            },
            {
                test: /\.(tpl|txt|xml|rels)$/i,
                use: 'raw-loader',
            }
        ]
    },
    devServer: {
        compress: true
    },
    performance: {
        hints: false
    },
    plugins: [
        new MinifyPlugin()
    ]
};