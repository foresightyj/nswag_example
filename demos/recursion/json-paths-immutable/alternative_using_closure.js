//@ts-check


function assert(o, msg) {
    if (!o) throw new Error(msg || "o falsy");
}

const obj = {
    name: "yj",
    age: 32,
    spouse: {
        name: "jn",
        child: {
            nickname: "xiaobao",
            hobby: "sleep"
        },
        car: {
            make: "Peugeot",
            model: "308S"
        }
    },
};


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

console.log(getJsonPathsMutableUsingClosure(obj));
