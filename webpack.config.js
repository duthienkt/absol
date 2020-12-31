const path = require('path');

var processFolder = process.cwd().replace(/\\/, '/');
var relative = path.relative(processFolder, __dirname);


function resolveEntry(entryInProject) {
    var entryInProcess = path.join(relative, entryInProject);
    if (!entryInProcess.startsWith('./')) entryInProcess = './' + entryInProcess;
    return entryInProcess;

}

var packages = {
    default: {
        entry: ["./src/absol.js"],
        filename: "./dist/absol.js"
    },
    wordfinder: {
        entry: ["./src/wordfinder.js"],
        filename: "./dist/wordfinder.js"
    },
    dependents: {
        entry: ["./src/dependents.js"],
        filename: "./dist/absol.dependents.js"
    },
    dev: {
        entry: ["./src/dependents.js",
            "./src/absol.js"],
        filename: "./dist/absol.js"
    },
}


var  buildPackage = packages[process.env.npm_lifecycle_event]||packages.default;


module.exports = {
    mode: process.env.MODE || "development",
    // mode: 'production',
    entry: buildPackage.entry.map(resolveEntry),
    output: {
        path: path.join(__dirname, "."),
        filename: buildPackage.filename
    },
    resolve: {
        modules: [
            path.join(__dirname, './node_modules')
        ]
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: [['@babel/preset-env', { modules: false }]] }
            },
            {
                test: /\.(tpl|txt|xml|rels)$/i,
                use: 'raw-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        // We do not want to minimize our code.
        minimize: false
    },
    devServer: {
        compress: true,
        disableHostCheck: true
    },
    performance: {
        hints: false
    }
};