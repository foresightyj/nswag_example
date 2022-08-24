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

function shallowCopy(obj) {
    const copy = {};
    for (const k of Object.keys(obj)) {
        copy[k] = obj[k];
    }
    return copy;
}

const shallowCopy2 = obj => ({...obj});
const shallowCopy3 = obj => Object.assign({}, obj);

const objCopy = shallowCopy(obj);
assert(obj.spouse === objCopy.spouse);
console.log("DONE");