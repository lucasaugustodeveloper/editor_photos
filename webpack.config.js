/**
 * Created by Lucas on 13/07/2017.
 */
const path = require('path')

module.exports = {
    entry: {
        main: [
            './assets/javascripts/jquery-3.2.1.min.js',
            './assets/javascripts/main.js'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    }
}
