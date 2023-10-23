var { exec } = require("shelljs");

var isWin = process.platform === "win32";
var isMac = process.platform === "darwin";

exec(`echo ${isWin ? "win" : isMac ? "mac" : "linux"}`);
