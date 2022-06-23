// rollup.config.js
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';


import path from 'path';

// TOOD - Split dev/prodc configuration

export default {
  input: 'src/index.js',
  output: {
    file: 'dev/tepsi.js',
    name: 'tepsi',
    format: 'umd',
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    postcss({
      extract: true,
      extractPath: path.resolve(__dirname, 'dist/tepsi.min.css'),
    }),
    serve(),
    livereload(),
  ],
};
