// rollup.config.js
// TODO - minify styles
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import path from 'path';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'tepsi',
      file: pkg.browser,
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    postcss({
      minimize: true,
      extract: true,
      extractPath: path.resolve(__dirname, 'dist/tepsi.min.css'),
    }),
    terser(),
  ],
};
