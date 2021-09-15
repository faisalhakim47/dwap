const Bundler = require('parcel-bundler');
const path = require('path');
const { exit } = require('process');

const bundler = new Bundler([path.join(__dirname, 'dist', 'dwap.js')], {
    global: 'Dwap',
    hmr: false,
    minify: true,
    outFile: path.join(__dirname, 'dist', 'dwap.umd.js'),
    publicUrl: './',
    sourceMaps: true,
    target: "browser",
    watch: false,
});

bundler.bundle().then(exit);
