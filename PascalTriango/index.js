function pascalsTriangle(n) {
    if (n === 0) {
        return [];
    }

    if (n === 1) {
        return [1];
    }

    if (n === 2) {
        return [1, 1, 1];
    }

    var prev = pascalsTriangle(n - 1);
    var result = [].concat(prev);

    for (var i = 0; i < n; i++) {
        if (i === 0 || i === n - 1) {
            result.push(1);
            continue;
        }

        result.push(prev[prev.length - n + i] + prev[prev.length - n + i + 1]);
    }

    return result;
}

module.exports = pascalsTriangle;