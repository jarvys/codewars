function dfs(vertex, fn) {
    vertex.visited = true;
    Object.keys(vertex.arcs).forEach(function(key) {
        var v = vertex.arcs[key];
        if (v.visited) {
            return;
        }

        dfs(v, fn);
    });

    fn(vertex);
}

function solve_graph(start, end, arcs) {
    var graph = {};
    arcs.forEach(function(arc) {
        if (!graph[arc.start]) {
            graph[arc.start] = {
                key: arc.start,
                visited: false,
                passed: false,
                arcs: {}
            };
        }

        if (!graph[arc.end]) {
            graph[arc.end] = {
                key: arc.end,
                visited: false,
                arcs: {}
            };
        }

        graph[arc.start].arcs[arc.end] = graph[arc.end];
    });

    if (!graph[start] || !graph[end]) {
        return false;
    }

    var result = false;
    dfs(graph[start], function(vertex) {
        if (vertex.key === end) {
            result = true;
        }
    });

    return result;
}

module.exports = solve_graph;