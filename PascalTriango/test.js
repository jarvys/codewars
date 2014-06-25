var assert = require("assert");
var pascalsTriangle = require("./index");

it('p(3) should be [1, 1, 1, 1, 2, 1]', function() {
    assert.deepEqual([1, 1, 1, 1, 2, 1], pascalsTriangle(3));
});

it('p(4) should be [1,1,1,1,2,1,1,3,3,1]', function() {
    assert.deepEqual([1,1,1,1,2,1,1,3,3,1], pascalsTriangle(4));
});