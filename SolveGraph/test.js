var assert = require("assert");
var solve_graph = require("./index");

describe("Simple graph with 1 arc", function() {
  var arcs = [{
    start: "a",
    end: "b"
  }, ]
  it("Should reach b", function() {
    assert.equal(solve_graph("a", "b", arcs), true);
  });
  it("Should never reach c", function() {
    assert.equal(solve_graph("a", "c", arcs), false);
  });
  it("Should reach start state", function() {
    assert.equal(solve_graph("a", "a", arcs), true);
  });
});

describe("Complex graph with loops and intermediary nodes", function() {
  var arcs = [{
    start: "a",
    end: "b"
  }, {
    start: "b",
    end: "c"
  }, {
    start: "c",
    end: "a"
  }, {
    start: "c",
    end: "d"
  }, {
    start: "e",
    end: "a"
  }];
  it("Should reach d", function() {
    assert.equal(solve_graph("a", "d", arcs), true);
  });
  it("Should never reach nodes with no arcs leading to it", function() {
    assert.equal(solve_graph("a", "e", arcs), false);
  });
  it("Should reach all nodes in a loop", function() {
    assert.equal(solve_graph("a", "a", arcs), true);
    assert.equal(solve_graph("a", "b", arcs), true);
    assert.equal(solve_graph("a", "c", arcs), true);
  });
});