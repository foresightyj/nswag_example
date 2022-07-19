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

function getJsonPathsMutable(obj) {
    function helper(o, parentPath, paths) {
        for (const k of Object.keys(o)) {
            const v = o[k];
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

console.log(getJsonPathsMutable(obj));
