cachedMap  = {
    map: new Map(),
    limit: 3,
    head: {
        key: "",
        value: "",
        prev: "",
        next: ""
    },
    tail: {
        key: "",
        value: "",
        prev: "",
        next: ""
    }
}
module.exports = cachedMap;
