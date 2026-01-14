const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'src/templates/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/images'),
                },
            ],
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, 'src/images/unram.png'),
        }),
        new WebpackPwaManifest({
            name: 'Movie Catalogue',
            short_name: 'Movie',
            description: 'The best curated Movies in Cinemas',
            background_color: '#ffffff',
            theme_color: '#d84315',
            start_url: './index.html',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve(__dirname, 'src/images/unram.png'),
                    sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        }),
    ],
};
