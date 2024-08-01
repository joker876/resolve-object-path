const path = require('path');

module.exports = {
    entry: './dist/index.js',
    mode: 'production',
    output: {
        filename: 'resolve-object-path.min.js',
        path: path.resolve(__dirname, 'dist/browser'),
        library: 'ResolveObjectPath',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: 'A TypeScript function that resolves a string path to an object\'s property.',
    },
};