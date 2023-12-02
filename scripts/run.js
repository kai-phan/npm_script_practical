var { exec } = require("shelljs");

var isWin = process.platform === "win32";
var isMac = process.platform === "darwin";
var isLinux = process.platform === "linux";

exec(`echo ${isWin ? "win" : isMac ? "mac" : "linux"}`);
