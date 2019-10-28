const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('../package');
const bundles = require('./bundles');
const util = require('util');
const webpack = util.promisify(require('webpack'));
const path = require('path');

(async () => {
    const banner = new webpack.BannerPlugin({
        banner: `Pickr ${version} MIT | https://github.com/Simonwep/pickr`
    });

    // CSS
    await webpack({
        mode: 'development',
        entry: {
            'classic': path.resolve('./src/scss/themes/classic.scss'),
            'monolith': path.resolve('./src/scss/themes/monolith.scss'),
            'nano': path.resolve('./src/scss/themes/nano.scss')
        },

        output: {
            path: path.resolve('./dist/themes')
        },

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },

        plugins: [
            banner,
            new FixStyleOnlyEntriesPlugin(),
            new OptimizeCSSAssetsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].min.css'
            })
        ]
    }).catch(console.error);

    // Chaining promises to prevent issues caused by both filename configurations
    // writing a minified CSS file; both processes having handles on the files can
    // result in strange suffixes that fail to parse due to an extra `ap*/`
    for (const {filename, babelConfig} of bundles) {
        await webpack({
            mode: 'development',
            entry: path.resolve('./src/js/pickr.js'),

            output: {
                path: path.resolve('./dist'),
                filename,
                library: 'Pickr',
                libraryExport: 'default',
                libraryTarget: 'umd'
            },

            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: babelConfig
                            },
                            'eslint-loader'
                        ]
                    }
                ]
            },

            plugins: [
                banner,
                new webpack.SourceMapDevToolPlugin({
                    filename: `${filename}.map`
                })
            ]
        }).catch(console.error);
    }

    console.log('Done');
})();
