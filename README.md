# Webpack / Babel / React / Tangram boilerplate

This is a minimal boilerplate for using [Tangram](https://github.com/tangrams/tangram) in a bundled JavaScript application with Webpack. Webpack is very commonly used with Babel and React, and this boilerplate also includes these. (Compare: https://github.com/tangrams/webpack-tangram-boilerplate)

To try this out, clone this repository to your local environment, then run:

```sh
npm install
npm run build
```

This will create a JavaScript bundle in `./public/scripts/bundle.js`.

Then run:

```sh
npm start
```

This will create a local web server so that you can observe the app in action. You can open it in your browser at `http://localhost:8080`.

The JavaScript tooling and build chain ecosystem can be very complex. This demonstration is designed to show Tangram integration into a very common developer ecosystem using Webpack, Babel (for ES2015 features), and React. Your own preferred workflow may include other tools, preprocessors, frameworks, etc.


### Building for production

Webpack's optimization / minification process takes a _very_ long time when the production library of Tangram is imported. It is more efficient to bundle the debug (unminified) version of Tangram than the pre-minified bundle. On my machine, bundling and optimizing with debug Tangram would take about ~10s while bundling and optimizing with compressed Tangram took ~100s. There is no time delay if you are not optimizing the final bundle. One solution is to not to optimize the final Webpack bundle in a development environment but only do this in production. Also, if you want to lower production build time there shouldn't be any issue using the debug version, which will be minified anyway.

To build a production-ready bundle, the command is:

```sh
npm run build-production
```


### Other notes about importing Tangram as a Webpack module.

- The compiled versions of Tangram come with UMD wrappers from Browserify. The `modules.exports` check gets evaluated and replaced when Webpack imports Tangram, so we must use the [`noParse` option](https://webpack.js.org/configuration/module/#module-noparse) with Tangram to keep it from getting mangled.
- It is not possible to bundle Tangram prior to v0.12.0.
- For versions between v0.12.0 to v0.12.4: when minifying, the `modules.exports` check will also be subjected to compression with UglifyJS, causing it to fail when run in the browser. In order to minimize properly we must send in an instance of UglifyJS with the option `compression: { comparisons: false }` to prevent the check from being destroyed. Since this is a custom instance of UglifyJS it is not possible to run the short-hand optimize/minimize command with `webpack -p`. This issue is [fixed in v0.12.5](https://github.com/tangrams/tangram/issues/559#issuecomment-304891020).
- It is not possible to bundle Tangram from source as it is built with a custom plugin to Browserify and requires Node's `fs` module.
- Tangram is available via `npm` starting from v0.13.0.

### For more information

See https://github.com/tangrams/tangram-play/wiki/Using-Tangram-with-Bundlers-&-Frameworks
