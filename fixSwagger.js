//@ts-check

const assert = require("assert");
const fs = require("fs-extra");
const shelljs = require("shelljs");

(async () => {
    const apiTsFilePath = "./src/api.ts";
    assert(await fs.pathExists(apiTsFilePath), "api.ts wrong path");
    shelljs.sed("-i", /body\?:/g, "body:", apiTsFilePath);
    //fix [Merge 2xx responses with the same type and handle them in one block · Issue #1259 · RicoSuter/NSwag]( https://github.com/RicoSuter/NSwag/issues/1259 )
    // shelljs.sed("-i", "status !== 200 && status !== 204", "status !== 200 && status !== 204 && status !== 202", apiTsFilePath);
    console.log('DONE FIXING');
})();


