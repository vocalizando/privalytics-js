import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import pkg from "./package.json"

export default [
    {
        input: "src/main.js",
        output: {
            name: "privalytics",
            file: `${pkg.browser}.js`,
            format: "umd",
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: "bundled",
            }),
        ],
    },
    {
        input: "src/main.js",
        output: [
            { file: `${pkg.main}.js`, format: "cjs" },
            { file: `${pkg.module}.js`, format: "es" },
        ],
        plugins: [
            babel({
                babelHelpers: "bundled",
            }),
        ],
    },
    // Without babel
    {
        input: "src/main.js",
        output: {
            name: "privalytics",
            file: `${pkg.browser}.nobabel.js`,
            format: "umd",
        },
        plugins: [
            resolve(),
            commonjs(),
        ],
    },
    {
        input: "src/main.js",
        output: [
            { file: `${pkg.main}.nobabel.js`, format: "cjs" },
            { file: `${pkg.module}.nobabel.js`, format: "es" },
        ],
    },
]
