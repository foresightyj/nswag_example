// paste this code into https://pythontutor.com/javascript.html#mode=edit

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

function getJsonPathsImmutable(obj) {
    function helper(o, parentPath) {
        const paths = [];
        for (const k of Object.keys(o)) {
            const v = o[k];
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

console.log(getJsonPathsImmutable(obj));
