function Node(i, j) {
    this.i = i;
    this.j = j;
    this.vertices = [];
}

var label = function(i, j) {
    return i + '-' + j;
}

Node.prototype.label = function() {
    return label(this.i, this.j);
};

Node.prototype.findVertices = function(graph, field) {
    var dimension = field.length;
    for (var i = Math.max(0, this.i - 1); i <= Math.min(dimension - 1, this.i + 1); i++) {
        for (var j = Math.max(0, this.j - 1); j <= Math.min(dimension - 1, this.j + 1); j++) {
            if (this.i === i && this.j === j) {
                continue;
            }

            if (field[i][j] === 1) {
                var node = graph[label(i, j)];
                if (!node) {
                    node = new Node(i, j);
                    graph[label(i, j)] = node;
                }

                this.vertices.push(node);
            }
        }
    }
};

Node.prototype.order = function(fn, visited) {
    var visited = visited || {};
    var node = this;
    if (visited[node.label()]) {
        return;
    }

    visited[node.label()] = true;
    fn(node);
    node.vertices.forEach(function(v) {
        v.order(fn, visited);
    });
}

Node.prototype.length = function() {
    if (!this.isEnd()) {
        throw new Error("not an end");
    }

    var count = 0;
    this.order(function() {
        count++;
    });

    return count;
};

Node.prototype.validate = function() {
    var onCorner = false;
    this.vertices.forEach(function(vertex) {
        if (vertex.i !== this.i && vertex.j !== this.j) {
            onCorner = true;
        }
    }.bind(this));

    if (onCorner) {
        return false;
    }

    if (this.isEnd()) {
        return true;
    }

    if (this.vertices.length >= 3) {
        return false;
    }

    var v1 = this.vertices[0];
    var v2 = this.vertices[1];
    return v1.i === v2.i || v1.j === v2.j;
}

Node.prototype.isEnd = function() {
    return this.vertices.length <= 1;
}

function isGraphEmpty(graph) {
    return Object.keys(graph).length === 0;
}

function strgraph(graph) {
    if (isGraphEmpty(graph)) {
        return 'empty graph';
    }

    return Object.keys(graph).map(function(key) {
        return strnode(graph[key]);
    }).join("\n");
}

function strnode(node) {
    var labels = node.vertices.map(function(v) {
        return v.label();
    }).join(", ");
    return node.label() + ' -> ' + labels;
}

function strship(node) {
    var nodes = [];
    node.order(function(n) {
        nodes.push(n);
    });

    return nodes.map(function(n) {
        return n.label();
    }).join(" -> ");
}

function validateBattlefield(field) {
    var graph = {};
    field.forEach(function(row, i) {
        row.forEach(function(cell, j) {
            if (cell === 1) {
                if (!graph[label(i, j)]) {
                    graph[label(i, j)] = new Node(i, j);
                }

                var node = graph[label(i, j)];
                node.findVertices(graph, field);
            }
        });
    });


    function nextEnd() {
        for (var key in graph) {
            if (graph[key].isEnd()) {
                return graph[key];
            }
        }

        return null;
    }

    for (var key in graph) {
        var node = graph[key];
        if (!node.validate()) {
            return false;
        }
    }

    var amount = {
        battleships: 1,
        cruisers: 2,
        destroyers: 3,
        submarines: 4
    };

    function empty() {
        var total = Object.keys(amount).reduce(function(prev, key) {
            return prev + amount[key];
        }, 0);

        return total === 0;
    }

    function deleteNode(node) {
        node.order(function(n) {
            delete graph[n.label()];
        });
    }

    function decrease(t) {
        if (amount[t] === 0) {
            return false;
        }

        amount[t]--;
        return true;
    }

    var SHIPS = ['submarines', 'destroyers', 'cruisers', 'battleships'];
    var node = nextEnd();
    var broken = false;
    while (!empty() && node) {
        var length = node.length();
        if (!decrease(SHIPS[length - 1])) {
            broken = true;
            break;
        }

        //console.log('delete ship', strship(node), length);
        deleteNode(node);
        node = nextEnd();
    }

    //console.log(strgraph(graph));
    console.log(amount);
    return !broken && isGraphEmpty(graph) && empty();
}

module.exports = validateBattlefield;
validateBattlefield.Node = Node;