module.exports = {
  scripts: {
    default: "node src/index.js", // nps
    // nps simple
    poststart: 'echo "poststart"',
    server: {
      default: "npm-run-all -p server:*",
      create: 'cross-var "http-server ./public -p $npm_package_config_port"',
      launch: "cross-var open-cli http://localhost:$npm_package_config_port",
    },
    test: {
      // nps test with script and description
      default: {
        script: "nps lint && jest",
        description: "Run tests",
      },
      watch: 'nps "test --watch"',
      ci: 'nps "test.watch --ci"',
    },
    coverage: "nps precoverage && jest --coverage && nps postcoverage",
    precoverage: "rimraf ./coverage",
    postcoverage: "open-cli ./coverage/lcov-report/index.html",
    bineslint: "./node_modules/.bin/eslint --cache --fix ./",
    prettier: {
      default: "prettier --write --tab-width=2 ./",
      verbose: "npm run prettier --loglevel verbose",
      silent: "npm run prettier -s",
    },
    lint: {
      // nps lint with options
      default: "nps lint.js lint.css lint.css.fmt prettier",
      // default: 'npm-run-all lint:** prettier',
      js: "eslint --cache --fix src/",
      css: {
        default: 'stylelint --fix "src/**/*.css"',
        fmt: "stylefmt --recursive ./",
      },
    },
    prebuild: {
      css: "npm run lint:css:fmt && rm -rf ./public/index.css",
    },
    build: {
      css: "nps prebuild.css && node-sass src/index.css | postcss -o public/index.css",
    },
    watch: {
      lint: 'onchange "./**/*.js" "./**/*.css" -- npm run lint',
      css: 'onchange "./**/*.css" -- npm run build:css',
    },
    log: {
      env: 'env | grep "config"',
      pkgname: "echo $npm_package_name",
      port: 'env | grep "npm_package_config_port"',
      config: "npm config ls -l",
    },
    set: {
      config: "npm config set npm_script_practical:port 3001",
    },
    prepare: "husky install",
    testEnv: "cross-env NODE_ENV=hello jest && echo $NODE_ENV",
    dotEnv: "dotenv -e .env.test jest",
  },
};
