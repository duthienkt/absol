const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");


var packages ={
    default: {
        entry: ['babel-polyfill', "./src/absol.js"],
        filename: "./dist/absol.js"
    },
    wordfinder :{
        entry: ["./src/wordfinder.js"],
        filename: "./dist/wordfinder.js"
    }
}

const PACKAGE = 'default';


module.exports = {
    mode: process.env.MODE || "development",
    // mode: 'production',
    entry: packages[PACKAGE].entry,
    output: {
        path: path.join(__dirname, "."),
        filename: packages[PACKAGE].filename
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
                test: /\.(tpl|txt|xml|rels|css)$/i,
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