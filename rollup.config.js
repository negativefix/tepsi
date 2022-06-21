// rollup.config.js
// TODO - minify styles
import css from 'rollup-plugin-import-css';
import { terser } from 'rollup-plugin-terser';
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
  plugins: [css(), terser()],
};
