var assert = require("assert");
var loop_size = require("./index.js");

it("shound equals 1", function() {
    var node = {
        getNext: function() {
            return this;
        }
    };

    assert.ok(loop_size(node) === 1);
});