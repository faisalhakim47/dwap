import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
    input: './dist/index.js',
    plugins: [
        terser({
            compress: true,
            mangle: true,
        }),
    ],
    output: [
        {
            file: './dist/index.umd.js',
            format: 'umd',
            name: 'Dwap',
            sourcemap: true,
        },
    ],
});
