import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import dotenv from 'dotenv';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import json from '@rollup/plugin-json';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: !isProduction,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: !isProduction,
      },
    ],
    watch: {
      clearScreen: false,
      include: 'src/**',
    },
    plugins: [
      external(),
      resolve({
        browser: true,
      }),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        plugins: [
          tailwindcss('./tailwind.config.js'),
        ],
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
      }),
      commonjs(),
      json(),
      typescript({
        sourceMap: !isProduction,
        tsconfig: './tsconfig.json',
        exclude: ['./example/**', './src/test/**'],
      }),
      replace({
       __ETHERSPOT_DATA_API_KEY__: process.env.ETHERSPOT_DATA_API_KEY ?? '',
       __ETHERSPOT_BUNDLER_API_KEY__: process.env.ETHERSPOT_BUNDLER_API_KEY ?? '',
        preventAssignment: true,
        __ETHERSPOT_BUILDER_VERSION__: packageJson.version,
        __ETHERSPOT_SDK_VERSION__: packageJson.dependencies.etherspot,
      }),
      process.env.NODE_ENV === 'production' && terser(),
    ],
    external: [
      'react',
      'react-dom',
      'styled-components',
      'etherspot',
      '@etherspot/prime-sdk',
      '@etherspot/transaction-kit'
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts(),postcss({
      minimize: true,
    })],
    external: [
      'react',
      'react-dom',
      'styled-components',
      'etherspot',
      '@etherspot/transaction-kit',
    ],
    watch: {
      clearScreen: false,
      include: 'src/**',
    },
  },
];
