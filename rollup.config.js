import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

const plugins = [
  peerDepsExternal(),
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: ["node_modules", "build", "tests"],
    },
  }),
  resolve({ preferBuiltins: false }),
  commonjs(),
  replace({
    preventAssignment: true,
    include: ["node_modules/jpeg-js/**/*.js"],
    values: {
      "Buffer.from": "new Uint8Array",
    },
  }),
  terser(),
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "build/mjs/index.mjs",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins,
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "build/cjs/index.cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins,
  },
];
