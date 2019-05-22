var cached_map = require("../services/cachedMap");

// use doubly linkedlist and map to realize LRU cache

// append the node to the tail of list
var append = function (node) {
    //move to the tail of list
    console.log("append " + node.key + " " + node.value);

    if (cached_map.head.key === "") {
        cached_map.head  = node;
        cached_map.tail = node;
        console.log("head " + cached_map.head.key+ " tail " + cached_map.tail.key);

    } else {
        node.prev = cached_map.tail;
        cached_map.tail.next = node;
        cached_map.map.set(cached_map.tail.key, cached_map.tail);
        cached_map.tail = node;

        console.log("head is at " + cached_map.head.key + " tail is at " + cached_map.tail.key);
    }

    cached_map.map.set(node.key, node);
};

// delete node from doubly linkedlist
var remove = function (node) {
    var prevNode = node.prev;
    var nextNode = node.next;
    console.log("deleting......url " + node.key);

    //remove the node of shortUrl between prevNode and nextNode
    cached_map. map.delete(node.key);
    console.log("delete successfully..... and the map size now is " + cached_map.map.size);

    //update the prevNode.next pointer to nextNode
    if (prevNode) {
        prevNode.next = nextNode;
        console.log("Updating next shortUrl in previous Node" + " to " + nextNode.key);
        cached_map.map.set(prevNode.key, prevNode);
        console.log("Update finished....");
    }
    //update the nextNode.prev pointer to prevNode
    if (nextNode) {
        console.log("Updating previous shortUrl in next Node from " + nextNode.prev.key
            + " to " + prevNode.key);
        nextNode.prev = prevNode;
        cached_map.map.set(nextNode.key, nextNode);
        console.log("Update finished....")
    }

    //if node -> head, update head pointer
    if (node.key == cached_map.head.key) {
        console.log("head node points to the deleted node so update head Node is required.... " );
        console.log("Updating header Node from " + cached_map.head.key
            + " to " + nextNode);
        cached_map.head = nextNode;
        console.log("Update finished......new header is " + nextNode.key);
    }
    //if node -> tail, update tail pointer
    if (node.key == cached_map.tail.key) {
        console.log("tail node points to the deleted node so update tail Node is required.... " );
        console.log("Updating tail Node from " + cached_map.tail.key
            + " to " + prevNode.key);
        cached_map.tail = prevNode;
        console.log("Update finished........new tail is " + cached_map.tail.key);
    }
};

var LRUCacheSet = function (key, value) {
    var removed = null;
    console.log("LRUCacheSet map size is " + cached_map.map.size);
    console.log("head key is " + cached_map.head.key );
    console.log("tail key is " + cached_map.tail.key );
    var node = null;

    // if map has key, remove it and append to tail
    if (cached_map.map.has(key)) {
        console.log("map has url " + key);
        node = cached_map.map.get(key);
        console.log("node prev in Get method" + node.prev);
        remove(node);
        // if map has no key and size < limit, create node and append to tail
    } else if (cached_map.map.size < cached_map.limit) {
        node = {
            key: key,
            value: value,
            prev: {
                key: "",
                value: "",
                prev: "",
                next: ""
            },
            next: {
                key: "",
                value: "",
                prev: "",
                next: ""
            }
        };
        // if map has no key and size >= limit, remove head, create node and append to tail
    } else {
        console.log("exceed the limit " + cached_map.limit);
        removed = cached_map.head;
        remove(removed);
        node = {
            key: key,
            value: value,
            prev: {
                key: "",
                value: "",
                prev: "",
                next: ""
            },
            next: {
                key: "",
                value: "",
                prev: "",
                next: ""
            }
        };
    }
    console.log("Start to append the url key: "+ key + " and value :" +  value + " to tail....");
    append(node);
    console.log("Finished append.....");
    if (removed != null) {
        console.log("The old url is removed " + removed.key  +  " "  + removed.value);
    }
};

var LRUCacheGet = function (url) {
    console.log("LRUCacheGet current map size is " + cached_map.map.size);
    var node = cached_map.map.get(url);
    console.log("node is: " + node);
    // if map has url, remove the node and append to tail
    if (typeof node !='undefined') {
        remove(node);
        console.log("appending node to tail......: " + node.key);
        append(node);
        console.log("Finished append " + node.key);
        return node;
        // if map has no url, return undefined
    } else {
        console.log("map doesn't include the cached url " + node);
        return 'undefined';
    }

};


module.exports = {
    append: append,
    remove: remove,
    LRUCacheGet: LRUCacheGet,
    LRUCacheSet: LRUCacheSet
};