//@ts-check

//promisify converts the traditional call back style (especially node.js) functions to promise based functions

const fs = require("fs");
const { promisify } = require("util");

// fs.readFile("../package2.json", { encoding: "utf-8" }, (err, content) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("-------------------");
//         console.log(content)
//     }
// });

const pReadFile = promisify(fs.readFile);

// pReadFile("../package.json", { encoding: "utf-8" }).then(content => {
//     console.log("-------------------");
//     console.log(content)
// }).catch(err => {
//     console.error(err.message);
// });

/**
 * @param {any} callbackStyleFn 
 */
function myPromisify(callbackStyleFn) {
    const promisifiedFn = (...args) => {
        let resolve, reject;
        const p = new Promise((res, rej) => {
            //asdfasdf
            resolve = res;
            reject = rej;
        });
        if (!resolve) throw new Error("resolve should be truthy");
        if (!reject) throw new Error("reject should be truthy");
        const cb = (err, ...cbArgs) => {
            if (err) {
                reject(err);
            } else {
                resolve(...cbArgs);
            }
        };

        callbackStyleFn(...args, cb); //think callbackStyleFn as fs.readFile
        return p;
    }
    return promisifiedFn;
}

// function add(x, y) {
//     return x + y;
// }

const myReadFile = myPromisify(fs.readFile);

myReadFile("../package.json", { encoding: "utf-8" }).then(content => {
    console.log("-------------------");
    console.log(content)
}).catch(err => {
    console.error(err.message);
});
