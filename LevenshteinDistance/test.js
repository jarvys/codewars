var assert = require("assert");
var Dictionary = require("./index");

it('should be ok', function() {
    var words = ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'];
    var dict = new Dictionary(words);
    
    assert.equal(dict.findMostSimilar('strawbery'), 'strawberry');
    assert.equal(dict.findMostSimilar('berry'), 'cherry');
});