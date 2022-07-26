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

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const objCopy = deepCopy(obj);
assert(obj.spouse !== objCopy.spouse);
console.log("DONE");