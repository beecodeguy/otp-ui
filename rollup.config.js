import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser';

export default {
  input: "./src/index.ts",
  output: [
    {
      file: './dist/index.js',
      format: 'es',
      sourcemap: false,
      strict: false
    }
  ],
  plugins: [
    terser(),
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