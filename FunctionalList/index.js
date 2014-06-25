function List() {}

List.prototype.push = function(x) {
    return new ListNode(x, this);
}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() {
    return "()";
};

EmptyList.prototype.isEmpty = function() {
    return true;
};

EmptyList.prototype.length = function() {
    return 0;
};

EmptyList.prototype.remove = function(x) {
    return this;
};

EmptyList.prototype.append = function(other) {
    return other;
};

function ListNode(value, next) {
    this.value = function() {
        return value;
    }

    this.next = function() {
        return next;
    }
}

ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;

ListNode.prototype.eq = function(x) {
    return this.value() === x;
}

ListNode.prototype.isEmpty = function() {
    return false;
};

ListNode.prototype.toString = function() {
    var cur = this;
    var values = [];
    while (!cur.isEmpty()) {
        values.push(cur.value());
        cur = cur.next();
    }

    return "(" + values.join(" ") + ")";
};

ListNode.prototype.head = function() {
    return this.value();
};

ListNode.prototype.tail = function() {
    return this.next();
};

ListNode.prototype.length = function() {
    var length = 0;
    var cur = this;
    while (!cur.isEmpty()) {
        length++;
        cur = cur.next();
    }

    return length;
};

ListNode.prototype.remove = function(x) {
    var next = this.tail().remove(x);
    if(this.eq(x)) {
        return next;
    }

    if(next === this.tail()) {
        return this;
    }

    return new ListNode(this.head(), next);
};

ListNode.prototype.append = function(other) {
    return new ListNode(this.head(), this.tail().append(other));
};