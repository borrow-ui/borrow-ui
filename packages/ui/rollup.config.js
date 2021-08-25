import cleaner from 'rollup-plugin-cleaner';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// TODO: add typescript support
// import typescript from "rollup-plugin-typescript2";

// To visualize the bundle
import { visualizer } from 'rollup-plugin-visualizer';

import packageJson from './package.json';

// Libraries used that should not be bundled.
// These are installed with optionalDependencies.
const externals = [
    '@popperjs/core/lib',
    'dayjs',
    'dayjs/plugin/customParseFormat',
    'lodash.debounce',
    'prismjs',
    'prop-types',
    'react',
    'react-day-picker/DayPickerInput',
    'react-day-picker',
    'react-dom',
    'react-dropzone',
    'react-is',
    'react-media',
    'react-popper',
    'react-select',
    'react-select/creatable',
];

const configuration = {
    input: 'src/index.js',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        cleaner({
            targets: ['./build_stats'],
        }),
        peerDepsExternal(),
        resolve(),
        commonjs({
            exclude: 'src/**',
        }),
        // Babel is used until TS is supported
        babel({
            extensions: ['.jsx', '.js', '.tsx'],
            exclude: '**/node_modules/**',
            babelHelpers: 'runtime',
            plugins: ['@babel/plugin-transform-runtime'],
        }),
        visualizer({ filename: './build_stats/bundle.html' }),
    ],
    // @babel/runtime has a long id, doing as
    // suggested in docs.
    external: (id) => id.includes('@babel/runtime') || externals.includes(id),
};

export default configuration;
