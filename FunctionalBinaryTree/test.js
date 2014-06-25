var assert = require("assert");
var tree = require("./index");

var tree = new tree.EmptyBinaryTree();
var t = tree.insert(8).insert(4).insert(12)
    .insert(2).insert(6).insert(10).insert(14)

it('should be [2, 4, 6, 8, 10, 12, 14]', function() {
    var values = [];
    t.inorder(function(value) {
        values.push(value);
    });
    assert.deepEqual(values, [2, 4, 6, 8, 10, 12, 14]);
});

it('should be [2, 4, 4, 4, 6, 8, 10, 12, 14] after 2 4s inserted', function() {
    var t1 = t.insert(4).insert(4);

    var values = [];
    t1.inorder(function(value) {
        values.push(value);
    });
    assert.deepEqual(values, [2, 4, 4, 4, 6, 8, 10, 12, 14]);
});