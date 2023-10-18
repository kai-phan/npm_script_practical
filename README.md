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
    "lint": "npm run lint:*",
    "lint:eslint": "eslint .",
    "lint:prettier": "prettier"
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
