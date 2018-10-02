const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/promise.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',  // no-cors request 
        port: 8080,
        hot: true,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node-modules)/,
                use: { 
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        // generate index.html, no need to generate the entry html
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        // clean up the built dist file
        new CleanWebpackPlugin(['dist']),

        new webpack.HotModuleReplacementPlugin()
    ],
}