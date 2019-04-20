import resolve from 'rollup-plugin-node-resolve';
// import { terser } from "rollup-plugin-terser";

export default {
    input: 'index.js',
    output: [
        {
            file: 'dist/main.cjs.js',
            format: 'cjs',
            exports: 'named'
        },
        {
            file: 'dist/main.esm.js',
            format: 'esm',
            exports: 'named'
        },
        {
            file: 'dist/main.umd.js',
            format: 'umd',
            name: "@alexbol99/collision_distance",
            exports: 'named',
            globals: {'@flatten-js/core': 'core'}
        },
    ],
    external: [ '@flatten-js/core' ], // <-- suppresses the warning
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        })
    ]
};
