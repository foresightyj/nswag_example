function debounce(ts, fn) {
    if (typeof ts !== "number" && ts <= 0) throw new Error("ts must be positive number");
    let tid;
    return function (...args) {
        if (tid) {
            clearTimeout(tid);
        }
        tid = setTimeout(() => {
            fn(...args);
            tid = null;
        }, ts);
    }
}

let count = 0;

const debouncedCount = debounce(3000, () => {
    count++;
    console.log("count", count);
});

module.exports = debouncedCount;