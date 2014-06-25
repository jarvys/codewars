function BinaryTree() {};

function BinaryTreeNode(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
    Object.freeze(this);
}
BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function() {
    return false;
};

BinaryTreeNode.prototype.depth = function() {
    return Math.max(this.left.depth(), this.right.depth()) + 1;
};

BinaryTreeNode.prototype.count = function() {
    return this.left.count() + this.right.count() + 1;
};

BinaryTreeNode.prototype.inorder = function(fn) {
    this.left.inorder(fn);
    fn(this.value);
    this.right.inorder(fn);
};

BinaryTreeNode.prototype.preorder = function(fn) {
    fn(this.value);
    this.left.preorder(fn);
    this.right.preorder(fn);
};

BinaryTreeNode.prototype.postorder = function(fn) {
    this.left.postorder(fn);
    this.right.postorder(fn);
    fn(this.value);
};

BinaryTreeNode.prototype.contains = function(x) {
    if (this.value === x) {
        return true;
    }

    return x < this.value ? this.left.contains(x) : this.right.contains(x);
};

BinaryTreeNode.prototype.insert = function(x) {
    if (x < this.value) {
        var left = this.left.insert(x);
        return left === this.left ? this :
            new BinaryTreeNode(this.value, left, this.right);
    } else if (x > this.value) {
        var right = this.right.insert(x);
        return right === this.right ? this :
            new BinaryTreeNode(this.value, this.left, right);
    } else {
        if (this.left.isEmpty() || this.right.isEmpty()) {
            if (this.left.isEmpty()) {
                return new BinaryTreeNode(x, new EmptyBinaryTree(), this);
            } else {
                return new BinaryTreeNode(x, this, new EmptyBinaryTree());
            }
        }

        return new BinaryTreeNode(x, this.left,
            new BinaryTreeNode(x, new EmptyBinaryTree(), this.right));
    }
};

BinaryTreeNode.prototype.remove = function(x) {
    if (this.value === x) {
        if (this.left.isEmpty() || this.right.isEmpty()) {
            return this.left.isEmpty() ? this.right : this.left;
        }

        var nodes = []
        var node = this.right;
        while (!node.isEmpty()) {
            nodes.push(node);
            node = node.left;
        }

        var left = this.left;
        var root = null;
        while (nodes.length > 0) {
            node = nodes.pop();
            root = new BinaryTreeNode(node.value, left, node.right);
            left = root;
        }

        return root;
    } else if (x < this.value) {
        var left = this.left.remove(x);
        return left === this.left ? this :
            new BinaryTreeNode(this.value, left, this.right);
    } else if (x > this.value) {
        var right = this.right.remove(x);
        return right === this.right ? this :
            new BinaryTreeNode(this.value, this.left, right);
    }
};

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() {
    Object.freeze(this);
}
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function() {
    return true;
};

EmptyBinaryTree.prototype.depth = function() {
    return 0;
};

EmptyBinaryTree.prototype.count = function() {
    return 0;
};

EmptyBinaryTree.prototype.inorder = function(fn) {
    return;
};

EmptyBinaryTree.prototype.preorder = function(fn) {
    return;
};

EmptyBinaryTree.prototype.postorder = function(fn) {
    return;
};

EmptyBinaryTree.prototype.contains = function(x) {
    return false;
};

EmptyBinaryTree.prototype.insert = function(x) {
    return new BinaryTreeNode(x, new EmptyBinaryTree(), new EmptyBinaryTree());
};

EmptyBinaryTree.prototype.remove = function(x) {
    return this;
};

module.exports = {
    BinaryTree: BinaryTree,
    BinaryTreeNode: BinaryTreeNode,
    EmptyBinaryTree: EmptyBinaryTree
};