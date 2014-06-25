function Leaf(atom, count) {
    this.atom = atom;
    this.count = count || 1;
}

Leaf.prototype.times = function(n) {
    this.count *= n;
}

Leaf.prototype.order = function(fn) {
    return fn(this);
}

function Node() {
    this.nodes = [];
}

Node.prototype.addChild = function(node) {
    this.nodes.push(node);
}

Node.prototype.times = function(n) {
    this.nodes.forEach(function(node) {
        node.times(n);
    });
}

Node.prototype.order = function(fn) {
    this.nodes.forEach(function(node) {
        node.order(fn);
    });
}

Node.prototype.lastChild = function() {
    return this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
}

function between(ch, start, stop) {
    return start <= ch && ch <= stop;
}

function numeric(c) {
    return between(c, '0', '9');
}

function tree(molecule) {
    var root = new Node();
    var stack = [];
    var pos = 0;
    var atom = '';
    var node = root;
    while (pos < molecule.length) {
        var ch = molecule[pos];

        if (between(ch, 'A', 'Z')) {
            if (atom !== '') {
                node.addChild(new Leaf(atom));
                atom = '';
            }

            atom = ch;
            pos++;
            continue;
        }

        if (between(ch, 'a', 'z')) {
            atom += ch;
            pos++;
            continue;
        }

        if (numeric(ch)) {
            var count = Number(molecule[pos]);
            pos++;

            while (pos < molecule.length && numeric(molecule[pos])) {
                count = count * 10 + Number(molecule[pos]);
                pos++;
            }

            node.addChild(new Leaf(atom, count));
            atom = '';
            continue;
        }

        if (ch === '(') {
            if (atom !== '') {
                node.addChild(new Leaf(atom));
                atom = '';
            }

            var child = new Node();
            node.addChild(child);
            stack.push(node);
            node = child;
            pos++;
            continue;
        }

        if (molecule[pos] === ')') {
            if (atom !== '') {
                node.addChild(new Leaf(atom));
                atom = '';
            }

            var prev = stack.pop();
            pos++;

            if (pos < molecule.length && numeric(molecule[pos])) {
                var times = 0;
                while (pos < molecule.length && numeric(molecule[pos])) {
                    times = times * 10 + Number(molecule[pos]);
                    pos++;
                }
                node.times(times);
            }
            node = prev;
        }
    }

    if (atom !== '' && !numeric(atom) && atom !== ')') {
        node.addChild(new Leaf(atom));
    }

    return root;
}

function order(nodes, fn) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.nodes) {
            order(node.nodes, fn);
        } else {
            fn(node);
        }
    }
}

function parseMolecule(molecule) {
    if (!molecule) {
        return {};
    }

    molecule = molecule.replace(/\[|\{/g, '(').replace(/\]|\}/g, ')');


    var root = tree(molecule);

    var result = {};
    root.order(function(leaf) {
        if (!result[leaf.atom]) {
            result[leaf.atom] = 0;
        }

        result[leaf.atom] += leaf.count;
    });

    return result;
}

module.exports = parseMolecule;