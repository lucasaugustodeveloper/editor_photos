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
        path: path.resolve(__dirname, './assets/javascripts')
    }
}
