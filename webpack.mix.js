const mix = require("laravel-mix");
let WebpackLaravelMixManifest = require('webpack-laravel-mix-manifest');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.react("resources/js/app.js", "app.js").sass(
    "resources/sass/app.scss",
    "css"
).extract();

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js/"),
            assets: path.resolve(__dirname, "resources/js/assets"),
            components: path.resolve(__dirname, "resources/js/components"),
            constants: path.resolve(__dirname, "resources/js/constants"),
            helpers: path.resolve(__dirname, "resources/js/helpers"),
            modules: path.resolve(__dirname, "resources/js/modules"),
            services: path.resolve(__dirname, "resources/js/services"),
            router: path.resolve(__dirname, "resources/js/router"),
            core: path.resolve(__dirname, "resources/js/core")
        }
    },
    output: {
        chunkFilename: 'build/[name].js?ver=[chunkhash]',
        filename: "build/[name].js",
    },
    plugins: [
        // Write out mix-manifest.json to build directory.
        new WebpackLaravelMixManifest()
    ]
});
