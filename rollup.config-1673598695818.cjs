'use strict';

var json = require('@rollup/plugin-json');
var rollupPluginTerser = require('rollup-plugin-terser');

const pkg = require('./package.json');

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n  AUTHOR  : ${pkg.author.name} \n* */`;
const basePlugins = [
    json()
    // ,commonjs()
];
module.exports = [
    {
        input: './src/index.js',
        plugins:basePlugins.concat([rollupPluginTerser.terser()]),
        external: [],
        output: {
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'file': 'dist/index.js'
        }
    },
    {
        input: './src/index.js',
        plugins: basePlugins,
        external: [],
        output: {
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'file': 'dist/'+pkg.name+'.js'
        }
    },
    {
        input: './src/index.js',
        plugins: basePlugins.concat([rollupPluginTerser.terser()]),
        external: [],
        output: {
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'file': 'dist/'+pkg.name+'.min.js'
        }
    },
];
