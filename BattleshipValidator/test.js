var assert = require("assert");
var validate = require("./index");
var Node = validate.Node;

describe('Node', function() {
    it('should be valid', function() {
        var node = new Node(4, 4);
        node.vertices = [
            new Node(4, 3),
            new Node(4, 5)
        ];

        assert.ok(node.validate());
    });

    it('should be invalid when cells connect on corner', function() {
        var node = new Node(4, 4);
        node.vertices = [
            new Node(3, 3)
        ];

        assert.ok(node.validate() === false);
    });

    it('should be invalid when it has more than 2 connected nodes', function() {
        var node = new Node(4, 4);
        node.vertices = [
            new Node(4, 3),
            new Node(4, 5),
            new Node(3, 4)
        ];

        assert.ok(node.validate() === false);
    });

    it('should be invalid when cells connect on edge', function() {
        var node = new Node(4, 4);
        node.vertices = [
            new Node(4, 3),
            new Node(5, 4)
        ];
        assert.ok(node.validate() === false);

        node.vertices = [
            new Node(5, 4),
            new Node(4, 3)
        ];
        assert.ok(node.validate() === false);
    });

    it('should be an end', function() {
        var node = new Node(4, 4);
        assert.ok(node.isEnd());

        node.vertices = [
            new Node(4, 3)
        ];
        assert.ok(node.isEnd());
    });

    it('should be a single cell', function() {
        var node = new Node(4, 4);

        assert.ok(node.validate() === true);
        assert.ok(node.isEnd());
    });

    it('should know length', function() {
        var node4_4 = new Node(4, 4);
        var node4_3 = new Node(4, 3);
        var node4_2 = new Node(4, 2);
        var node4_1 = new Node(4, 1);

        assert.equal(node4_4.length(), 1);

        node4_4.vertices = [
            node4_3
        ];
        node4_3.vertices = [
            node4_4
        ];
        assert.equal(node4_4.length(), 2);

        node4_3.vertices = [
            node4_4,
            node4_2
        ];
        node4_2.vertices = [
            node4_3
        ]
        assert.equal(node4_4.length(), 3);

        node4_2.vertices = [
            node4_3,
            node4_1
        ];
        node4_1.vertices = [
            node4_2
        ]
        assert.equal(node4_4.length(), 4);
        assert.equal(node4_1.length(), 4);
    });
});

it('should be ok', function() {
    assert.ok(validate([
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]));
});