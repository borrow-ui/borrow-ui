import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// To visualize the bundle
import { visualizer } from 'rollup-plugin-visualizer';

import packageJson from './package.json';

// Libraries used that should not be bundled.
// These are installed with optionalDependencies.
const externals = [
    '@popperjs/core/lib',
    'date-fns',
    'lodash.debounce',
    'prismjs',
    'prop-types',
    'react',
    'react-day-picker/DayPickerInput',
    'react-day-picker',
    'react-dom',
    'react-dropzone',
    'react-media',
    'react-popper',
    'react-select',
    'react-select/creatable',
];

const configuration = {
    input: 'src/index.ts',
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
        typescript({ tsconfig: './tsconfig.json' }),
        visualizer({ filename: './build_stats/bundle.html' }),
        terser(),
    ],
    // @babel/runtime has a long id, doing as
    // suggested in docs.
    external: (id) => id.includes('@babel/runtime') || externals.includes(id),
};

const typesConfiguration = {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/, /\.scss$/],
    plugins: [dts()],
};

export default [configuration, typesConfiguration];
