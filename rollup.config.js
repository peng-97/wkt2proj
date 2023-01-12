import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import  { terser }  from 'rollup-plugin-terser'
const pkg = require('./package.json');

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n  AUTHOR  : ${pkg.author.name} \n* */`;
const basePlugins = [
    json(),commonjs()
];
module.exports = [
    {
        input: './src/index.js',
        plugins:basePlugins.concat([terser()]),
        external: [],
        output: {
            'sourcemap': true,
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'globals': {},
            'file': 'dist/index.js'
        }
    },
    {
        input: './src/index.js',
        plugins: basePlugins,
        external: [],
        output: {
            'sourcemap': true,
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'file': 'dist/'+pkg.name+'.js'
        }
    },
    {
        input: './src/index.js',
        plugins: basePlugins.concat([terser()]),
        external: [],
        output: {
            'sourcemap': true,
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'file': 'dist/'+pkg.name+'.min.js'
        }
    },
];
