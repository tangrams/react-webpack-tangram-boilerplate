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
