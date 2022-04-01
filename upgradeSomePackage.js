//@ts-check

const fs = require("fs");
const assert = require("assert");
const shelljs = require("shelljs");

const p = "./package.json";
assert(fs.existsSync(p), "file not found");

shelljs.sed("-i", patt, `"./dist": "./dist",
"./dist/index.css": "./dist/index.css"
`, p);

console.log("DONE");
