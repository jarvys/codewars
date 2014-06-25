function loop_size(node) {
    var array = [];
    while (!~array.indexOf(node)) {
        array.push(node);
        node = node.getNext();
    }

    return array.length - array.indexOf(node);
}

module.exports = loop_size;