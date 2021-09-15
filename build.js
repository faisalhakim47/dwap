const { rollup } = require('rollup');
const rollupPluginTypescript = require('@rollup/plugin-typescript');
const { getBabelOutputPlugin } = require('@rollup/plugin-babel');

// WHY?
rollupPluginTypescript.default = rollupPluginTypescript.default || rollupPluginTypescript;
rollupPluginBabel.default = rollupPluginBabel.default || rollupPluginBabel;

rollup({
    input: './src/index.ts',
    treeshake: true,
    plugins: [
        rollupPluginTypescript.default({
            declaration: true,
            declarationMap: true,
            module: "ESNext",
            outDir: "dist",
            rootDir: "src",
            sourceMap: true,
            target: "ESNext"
        }),
        rollupPluginBabel.default({
            babelHelpers: 'bundled',
        }),
    ],
}).then(async (build) => {
    const output = await build.generate({
        format: 'umd',
        name: 'Dwap',
        sourcemap: true,
        file: 'dist/index.js',
    });
    console.log(output);
}).catch((error) => {
    console.log(error);
});
