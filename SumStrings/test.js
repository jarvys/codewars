var assert = require("assert");
var sumStrings = require("./index.js");

it('normal', function() {
	assert.equal(sumStrings('123', '456'), '579');
	assert.equal(sumStrings('8797', '45'), '8842');
});

it("ignore zero", function() {
	assert.equal(sumStrings('00103', '08567'), '8670');
});
