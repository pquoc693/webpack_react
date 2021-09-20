const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = [
    'axios',
    'bootstrap',
    // 'font-awesome',
    'jquery',
    'react',
    'react-router-dom',
    'react-redux',
    'react-dom',
    'redux',
    'redux-thunk',
]
module.exports = {
    entry: {
        bundel: './src/index.js',
        // vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                // exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2|\.ctt$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    // target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        // new webpack.optimize.SplitChunksPlugin({

        // })
        new HtmlWebpackPlugin({
            template: 'src/index.html', //chèn bundle và vendor vào file index.html
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: "manifest",
        }
    },
    mode: 'development' // set MODE cho webpack
}