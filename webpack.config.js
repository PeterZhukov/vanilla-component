module.exports = {
    entry: './src/js/component.js',
    mode: 'development',
    output: {
        path: `${__dirname}/dist`,
        filename: 'component.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
