import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'

import * as pkg from './package.json'
export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    sass({ insert: true }),
    typescript(),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
  external: ["react", "react-dom"],
}