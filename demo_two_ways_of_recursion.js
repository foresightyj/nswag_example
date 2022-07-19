//@ts-check


function assert(o, msg) {
    if (!o) throw new Error(msg ?? "o falsy");
}

const obj = {
    name: "yj",
    age: 32,
    spouse: {
        name: "jn",
        child: {
            nickname: "xiaobao",
            hobby: "sleep"
        }
    }
};

function getJsonPathsMutable(obj) {
    /**
     * @param {object} o 
     * @param {string} parentPath 
     * @param {string[]} paths 
     */
    function helper(o, parentPath, paths) {
        assert(typeof o === "object", "o must be object");
        for (const [k, v] of Object.entries(o)) {
            if (typeof v === "object") {
                helper(v, parentPath + k + ".", paths);
            } else {
                paths.push(parentPath + k);
            }
        }
    }

    const paths = [];
    helper(obj, "", paths);
    return paths;
}

// slight variation of above, still mutating the same array ref.
function getJsonPathsMutableUsingClosure(obj) {
    /**
     * @param {object} o 
     * @param {string} parentPath 
     */
    function helper(o, parentPath) {
        assert(typeof o === "object", "o must be object");
        for (const [k, v] of Object.entries(o)) {
            if (typeof v === "object") {
                helper(v, parentPath + k + ".");
            } else {
                paths.push(parentPath + k);
            }
        }
    }

    const paths = [];
    helper(obj, "");
    return paths;
}

function getJsonPathsImmutable(obj) {
    /**
     * @param {object} o 
     * @param {string} parentPath 
     * @return {string[]}
     */
    function helper(o, parentPath) {
        assert(typeof o === "object", "o must be object");
        /** @type {string[]} */
        const paths = [];
        for (const [k, v] of Object.entries(o)) {
            if (typeof v === "object") {
                const returnedPaths = helper(v, parentPath + k + ".");
                returnedPaths.forEach(p => paths.push(p));
            } else {
                paths.push(parentPath + k);
            }
        }
        return paths;
    }

    return helper(obj, "");
}

console.log(getJsonPathsMutable(obj));
console.log(getJsonPathsMutableUsingClosure(obj));
console.log(getJsonPathsImmutable(obj));
