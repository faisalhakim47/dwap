import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
    input: './dist/index.js',
    context: 'window',
    plugins: [
        terser({
            compress: true,
            mangle: true,
        }),
    ],
    output: {
        file: './dist/index.browser.js',
        format: 'umd',
        name: 'Dwap',
        sourcemap: true,
    },
});
