# npm scripts practice

The goals of this practice are:

- to learn how to use npm scripts
- to learn how to use npm scripts to automate tasks
- to learn how to use npm scripts with bash commands
- to learn how to use npm scripts with node commands

```bash
$ npm help scripts
```

### Description

The `scripts` property in `package.json` file supports a number of built-in scripts and their preset life cycle events. You can also create your own scripts.
They can be run with `npm run <script-name>` command.

### Built-in scripts

- `npm start` - runs an arbitrary command specified in the `package.json`'s `start` property of its `scripts` object. If no `start` property is specified on the `scripts` object, it will run `node server.js`.
- `npm test` - runs an arbitrary command specified in the `package.json`'s `test` property of its `scripts` object. If no `test` property is specified on the `scripts` object, it will do an `echo 'Error: no test specified' && exit 1`.
- `npm stop` - runs an arbitrary command specified in the `package.json`'s `stop` property of its `scripts` object. If no `stop` property is specified on the `scripts` object, it will do an `echo 'Error: no stop specified' && exit 1`.
- `npm install` - runs an arbitrary command specified in the `package.json`'s `install` property of its `scripts` object. If no `install` property is specified on the `scripts` object, it will do an `node-gyp rebuild`.
- `npm publish` - runs an arbitrary command specified in the `package.json`'s `publish` property of its `scripts` object. If no `publish` property is specified on the `scripts` object, it will do an `echo 'Error: no publish specified' && exit 1`.

### Prefix

- `pre` - runs before the specified script. For example, `pretest` will run before `test` script.
- `post` - runs after the specified script. For example, `posttest` will run after `test` script.

```json
"scripts": {
    "pretest": "echo 'I run before test script'",
    "test": "echo 'I run test script'",
    "posttest": "echo 'I run after test script'"
}
```

### Life cycle events (important)

- `prepare` - runs both on `npm install` and `npm update`.
- `preinstall` - runs before `npm install` is executed.
- `install` - runs on `npm install` is executed.
- `postinstall` - runs after `npm install` is executed.

### path

- `./node_modules/.bin` - npm adds the `./node_modules/.bin` folder to the `PATH` environment variable. This means that all the executables from the dependencies can be called by their name without having to enter the full path to the executable. For example, if you have a dependency `mocha` installed, you can run it by entering `mocha` in the terminal.

### event

if you had `{"scripts": {"install": "foo.js"}}` in your `package.json` file, then `foo.js` would be executed when we run `npm install`. We'd see this in the script

```
process.env.npm_package_scripts_install === 'foo.js'
```

### Custom scripts with node commands

```
"script" : {
    "foo": "node foo.js"
}
```

### Custom scripts with arguments

```
"script" : {
    "foo": "node foo.js --bar"
}
```

### Custom scripts with bin files

```
"script" : {
    "foo": "foo"
}
```

in `foo.js` file

```js
#!/usr/bin/env node
console.log("foo");
```

in `package.json` file

```
"bin": {
    "foo": "./foo.js"
}
```

### Reference local npm package

```
"script" : {
    "eslint": "./node_modules/.bin/eslint ."
}
```

or

```
"script" : {
    "eslint": "$(npm bin)/eslint ."
}
```

### Run scripts in series

```
"script" : {
    "lint": "eslint . && prettier && echo 'linting done'",
}
```

### Run scripts in parallel

```
"script" : {
    "lint-parallel": "npm run eslint & npm run prettier & echo \"lint parallel\" & wait"
}
```

`wait`: wait for all background jobs to finish before continuing

### Run a set npm scripts with wildcard

```
"script" : {
    "lint": "run-p lint:*",
    "lint:eslint": "eslint .",
    "lint:prettier": "prettier"
}
"devDependencies: {
    "npm-run-all": "^4.1.5"
}
```

```
"script": {
    "lint": "npm run lint:**",
    "lint:js": "eslint .",
    "lint:css": "stylelint ."
    "lint:css:fix": "stylefmt ."
}
```

### Use pre and post npm scripts lifecycle hook

```
"scripts": {
    "pretest": "npm run lint",
    "test": "jest",
    "coverage": "jest --coverage",
    "precoverage": "rm -rf ./coverage",
    "postcoverage": "open ./coverage/lcov-report/index.html",
}
```

### Pass arguments to npm scripts

```
"scripts": {
    "test": "jest",
    "test:watch": "npm run test -- --watch",
    "test:coverage": "npm run test -- --coverage",
    "test:coverage:watch": "npm run test -- --coverage --watch",
}
```

or

```
"scripts": {
    "test": "jest",
    "test:watch": "npm run test -- --watch",
    "test:watch:coverage": "npm run test:watch -- --coverage",
}
```

### Pipe npm scripts

```
"scripts": {
    "prebuild:css": "npm run lint:css:fmt && rm -rf ./public/index.css",
    "build:css": "node-sass src/index.css | postcss -o public/index.css"
}
```

### Run npm scripts when file change

```
"scripts": {
    "watch:css": "onchange 'src/**/*.css' -- echo 'from {{event}} to {{file}}'"
}
```

### package.json variables

```
"scripts": {
    "log:name": "echo $npm_package_name"
}
```

### Custom config

```
"config": {
    "port": 3030
},
```

Any environment variables that start with npm*config* will be interpreted as a configuration parameter. For example, putting npm_config_foo=bar in your environment will set the foo configuration parameter to bar. Any environment configurations that are not given a value will be given the value of true. Config values are case-insensitive, so NPM_CONFIG_FOO=bar will work the same. However, please note that inside scripts npm will set its own environment variables and Node will prefer those lowercase versions over any uppercase ones that you might set. For details see this issue.

Notice that you need to use underscores instead of dashes, so --allow-same-version would become npm_config_allow_same_version=true.

```bash
$ npm config set <key> <value>
```

```bash
$ npm config set port 3000
```

### Loglevel

`npm run <script> --silent` to reduce logs and to prevent the script from throwing an error.

short version

- `npm run <script> -s`
- `npm run <script> -q`: --quiet, --loglevel warn
- `npm run <script> -d`: --loglevel info
- `npm run <script> -dd`: --loglevel verbose
- `npm run <script> -ddd`: --loglevel silly

```
"scripts": {
    "log:level:silent": "npm run test --silent",
    // or "log:level:silent": "npm run test -s",
    // or "log:level:silent": "npm run test --loglevel silent",
    "log:level:warn": "npm run --loglevel warn",
    "log:level:error": "npm run --loglevel error",
    "log:level:info": "npm run --loglevel info",
    "log:level:http": "npm run --loglevel http",
    "log:level:verbose": "npm run --loglevel verbose",
    "log:level:silly": "npm run --loglevel silly",
    "log:level:timing": "npm run --loglevel timing"
}
```

### Cross platform

- `cross-env` - Run scripts that set and use environment variables across platforms

```
"scripts": {
    "test": "cross-env NODE_ENV=test jest",
}
```

- `rimraf` - A cross platform solution to remove the files and folders

```
"scripts": {
    "clean": "rimraf ./dist",
}
```

- or `del-cli` - Delete files and folders

```
"scripts": {
    "clean": "del ./dist",
}
```

- opn-cli - A better node-open. Opens stuff like websites, files, executables. Cross-platform.

```
"scripts": {
    "open": "open-cli http://localhost:3000",
}
```

- cross-var - Cross platform environment variables

```
"scripts": {
    "//": "this one is for multiple commands, using string escaping",
    "open": "cross-var \"http-server ./public -p $npm_package_config_port\"",
    "//": "this one is for a single command",
    "open": "cross-var http-server ./public -p $npm_package_config_port",
}
```

### Use env variables

The environment variables are accessible from the `process.env` object,

```
"scripts": {
    "test": "NODE_ENV=test_env jest",
}
```

### Use env variables with dotenv

- `dotenv` - Loads environment variables from .env file

```
"scripts": {
    "test": "dotenv -e .env.test jest",
}
```

### Use bash file to run npm scripts

```
"scripts": {
    "test": "bash ./scripts/test.sh",
}
```

### Use node script to run npm scripts

```
"scripts": {
    "test": "node ./scripts/test.js",
}
```

### Use bin file to run npm scripts

```
"scripts": {
    "mycli": "mycli"
}
```
